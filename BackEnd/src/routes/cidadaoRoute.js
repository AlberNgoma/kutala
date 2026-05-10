const express = require("express");
const cidadaoController = require("../controllers/cidadaoController");

const route = express.Router();

route.post("/cadastrar-cidadao", cidadaoController.criarCidadao);
route.get("/listar-cidadao", cidadaoController.listarCidadao);
route.get("/listar-cidadao/:id", cidadaoController.listarCidadaoId);
route.put("/actualizar-cidadao/:id", cidadaoController.actualizarCidadao);
route.delete("/apagar-cidadao/:id", cidadaoController.apagarCidadao);
route.get("/total-cidadao", cidadaoController.totalCidadao);
module.exports = route;