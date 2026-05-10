const climaService = require("../services/climaService");
const db = require("../models/index");


module.exports = {

    async buscarClima(req, res) {
        const bairro_id = req.params.bairro_id;
        try {

            const bairro = await db.bairro.findByPk(bairro_id);

            if (!bairro) {
                return res.status(404).json({ erro: "Bairro não existe" });
            }

            const latitude = bairro.latitude;
            const longitude = bairro.longitude;


            const dados = await climaService.obterClima(latitude, longitude);

            const clima = {
                chuva: dados.rain ? dados.rain["1h"] || dados.rain["3h"] : 0,
                temperatura: dados.main.temp,
                humidade: dados.main.humidity,
                descricao_clima: dados.weather[0].description

            }

            const novosDados = await db.dados_clima.create({
                chuva: clima.chuva,
                temperatura: clima.temperatura,
                humidade: clima.humidade,
                descricao_clima: clima.descricao_clima,
                bairro_id: bairro.id
            })

            return res.status(201).json({ mensagem: "Dados climáticos guardados!", novosDados });


        } catch (error) {
            console.log("Erro ao buscar dados do clima ", error)
        }
    },

    async buscarUltimoClima(req, res) {
        const bairro_id = req.params.bairro_id;
        try {

            if(!bairro_id){
                return res.status(404).json("Este bairro não existe");
            }
            

            const ultimoClima = await db.dados_clima.findOne({
                where: { bairro_id },
                order: [["createdAt", "DESC"]]

            })

            if (!ultimoClima) {
                return res.status(404).json({ erro: "Sem dados climáticos para este bairro" });
            }

            return res.status(200).json(ultimoClima)

        } catch (error) {
            console.log("Erro ao buscar clima")
            return res.status(500).json({ erro: "Erro ao obter clima" });
        }
    }



}