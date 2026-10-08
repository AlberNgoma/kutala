const cron = require("node-cron");
const db = require("../models/index");
const climaService = require("../services/climaService");


const LIMITES = {
    ALTO: { chuva: 3, humidade: 30 },
    MEDIO: { chuva: 2, humidade: 20 },
    BAIXO: { chuva: 0, humidade: 10 }
}

function classificarNivel(chuva, humidade) {
    if (chuva >= LIMITES.ALTO.chuva && humidade >= LIMITES.ALTO.humidade) return 'ALTO';
    if (chuva >= LIMITES.MEDIO.chuva && humidade >= LIMITES.MEDIO.humidade) return 'MEDIO';
    if (chuva >= LIMITES.BAIXO.chuva && humidade >= LIMITES.BAIXO.humidade) return 'BAIXO';

    return null
}


function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


cron.schedule("*/10 * * * * *", async () => {
    console.log("Cron job a funcionar");

    const bairros = await db.bairro.findAll();

    for (const bairro of bairros) {
        try {
            const dados = await climaService.obterClima(bairro.latitude, bairro.longitude);

            const clima = {
                chuva: dados.rain ? dados.rain["1h"] : 0,
                temperatura: dados.main.temp,
                humidade: dados.main.humidity,
                descricao_clima: dados.weather[0].description
            }

            const dadosExistente = await db.dados_clima.findOne({
                where: {
                    bairro_id: bairro.id
                }
            })






            if (dadosExistente) {

                const valorActualizado =
                    dadosExistente.chuva !== clima.chuva ||
                    dadosExistente.temperatura !== clima.temperatura ||
                    dadosExistente.humidade !== clima.humidade ||
                    dadosExistente.descricao_clima !== clima.descricao_clima;

                if (valorActualizado) {
                    await dadosExistente.update({
                        chuva: clima.chuva,
                        temperatura: clima.temperatura,
                        humidade: clima.humidade,
                        descricao_clima: clima.descricao_clima
                    })
                    console.log("Dados actualizados com sucesso!")
                } else {
                    console.log("Nenhuma actualização")
                }


            } else {

                await db.dados_clima.create({
                    chuva: clima.chuva,
                    temperatura: clima.temperatura,
                    humidade: clima.humidade,
                    descricao_clima: clima.descricao_clima,
                    bairro_id: bairro.id
                })
            }

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

                        nivel_alerta: nivelSugerido,
                        descricao: dadosExistente.descricao_clima,
                        status: 'PENDENTE',
                        bairro_id: bairro.id,
                        municipio_id: bairro.municipio_id,
                        dados_clima_id: dadosExistente.id
                    });
                    console.log(` Alerta criado para o bairro ${bairro.nome}`);
                }
            }

        } catch (error) {

            console.log(`Erro ao processar bairro ${bairro.nome}:`, error.message);
        }

        esperar(4000)
    }


});