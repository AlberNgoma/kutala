const express = require("express");
const climaController = require("../controllers/climaController")

const route = express.Router();

route.get("/clima/:bairro_id", climaController.buscarClima);
route.get("/ultimo-clima/:bairro_id", climaController.buscarUltimoClima);

module.exports = route