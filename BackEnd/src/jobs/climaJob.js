const cron = require("node-cron");
const db = require("../models/index");
const climaService = require("../services/climaService");


const LIMITES = {
    ALTO: { chuva: 0, humidade: 30 },
    MEDIO: { chuva: 0, humidade: 20 },
    BAIXO: { chuva: 0, humidade: 10 }
}

function classificarNivel(chuva, humidade) {
    if (chuva >= LIMITES.ALTO.chuva && humidade >= LIMITES.ALTO.humidade) return 'ALTO';
    if (chuva >= LIMITES.MEDIO.chuva && humidade >= LIMITES.MEDIO.humidade) return 'MEDIO';
    if (chuva >= LIMITES.BAIXO.chuva && humidade >= LIMITES.BAIXO.humidade) return 'BAIXO';

    return null
}

cron.schedule("*/10 * * * * *", async () => {
    console.log("Cron job a funcionar");

    const bairros = await db.bairro.findAll();

    for (const bairro of bairros) {
        try {
            const dados = await climaService.obterClima(bairro.latitude, bairro.longitude);

            const clima = {
                chuva: dados.rain ? dados.rain["1h"] || dados.rain["3h"] : 0,
                temperatura: dados.main.temp,
                humidade: dados.main.humidity,
                descricao_clima: dados.weather[0].description
            }

            await db.dados_clima.create({
                chuva: clima.chuva,
                temperatura: clima.temperatura,
                humidade: clima.humidade,
                descricao_clima: clima.descricao_clima,
                bairro_id: bairro.id
            });

            console.log(`Dados do bairro ${bairro.nome} armazenados`);


            const nivelSugerido = classificarNivel(clima.chuva, clima.humidade)



            if (nivelSugerido) {
                const alertaExistente = await db.alerta.findOne({
                    where: {
                        bairro_id: bairro.id,
                        status: 'PENDENTE'
                    }
                });


                if (!alertaExistente) {
                    await db.alerta.create({
                        titulo: "Risco de inundação",
                        mensagem: `Chuva: ${clima.chuva}mm | Humidade: ${clima.humidade}% `,
                        nivel_alerta: nivelSugerido,
                        status: 'PENDENTE',
                        bairro_id: bairro.id,
                        municipio_id: bairro.municipio_id
                    });
                    console.log(` Alerta criado para o bairro ${bairro.nome}`);
                }
            }

        } catch (error) {

            console.log(`Erro ao processar bairro ${bairro.nome}:`, error.message);
        }
    }

    
});