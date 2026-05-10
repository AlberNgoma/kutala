const express = require("express");
const governador = require("../controllers/governadorController");

const route = express.Router();

route.post("/governador", governador.criarGovernador);
route.get("/governador", governador.listarGovernador);
route.get("/total-governador", governador.totalGov);
route.get("/governador/:id", governador.listarGovId);
route.put("/actualizar-gov/:id", governador.actualizarGov);
route.delete("/governador/:id", governador.apagarGov);
module.exports = route;
