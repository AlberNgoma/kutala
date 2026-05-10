const express = require("express");
const municipio = require("../controllers/municipioController");

const route = express.Router();

route.get("/provincias/:id/municipios", municipio.listarMunicipio);

module.exports = route;