const express = require("express");
const bairro = require("../controllers/bairroController");

const route = express.Router(); 

route.get("/municipios/:id/bairros", bairro.listarBairros)
route.get("/bairros", bairro.todosBairros)
route.get("/total-bairros", bairro.totalBairro);
route.get("/total-bairros/:id", bairro.totalBairroMunicipio)

module.exports = route;