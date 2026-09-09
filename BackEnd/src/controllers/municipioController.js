const db = require("../models/index");


module.exports = {
    async listarMunicipio(req, res) {
        const provincia_id = req.params.id;
        try {

            const todosMunicipios = await db.municipio.findAll({
                where: { provincia_id }
            })
            return res.status(200).json(todosMunicipios)


        } catch (error) {
            return res.status(500).json("Erro ao listar municipios ", error)
        }
    },

    async todosMunicipios(req, res){
        
    }
}