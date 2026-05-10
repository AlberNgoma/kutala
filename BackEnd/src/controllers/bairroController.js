
const db = require("../models/index");

module.exports = {
    async listarBairros(req, res) {
        const municipio_id = req.params.id

        try {

            const todosBairros = await db.bairro.findAll({
                where: { municipio_id }
            })

            return res.status(200).json(todosBairros)




        } catch (error) {
            return res.status(500).json("Erro ao listar bairros ", error)
        }
    },

    async todosBairros(req, res) {
        try {
            const bairros = await db.bairro.findAll({
                include: {
                    model: db.risco_inundacao, as: 'riscos',
                    attributes: ['nivel'],
                    
                }
               
            });
            
            return res.status(200).json(bairros)

        } catch (error) {
            console.log("Erro ao listar todos os bairros ", error)
        }
    },

    async totalBairro(req, res) {
        try {

            const todosBairros = await db.bairro.count();
            return res.status(200).json(todosBairros)




        } catch (error) {
            console.log("Erro ao cacular total de bairros ", error);
            return res.status(500).json({ error: "Erro ao calcuar total de bairros" })
        }
    },

    async totalBairroMunicipio(req, res) {
        const municipio_id = req.params.id;

        try {
            const todosBairros = await db.bairro.count({ where: { id: municipio_id } });
            return res.status(200).json(todosBairros)



        } catch (error) {
            console.log("Erro ao calcular bairros por município ", error);
            return res.status(500).json({ error: "Erro ao calcular bairros por município " })
        }
    }


}