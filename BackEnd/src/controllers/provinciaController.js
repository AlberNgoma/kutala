const db = require("../models/index");


module.exports = {
    async listarProvincias(req, res) {
        try {

            const todasProvincias = await db.provincia.findAll();
            return res.status(200).json(todasProvincias);

        } catch (error) {
            return res.status(500).json("Erro ao listar províncias ", error)
        }
    }
}