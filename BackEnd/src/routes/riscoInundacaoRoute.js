const express = require("express");
const riscoInundacao = require("../controllers/risco_inundacaoController");
const verificarToken = require("../middlewares/checkToken")

const route = express.Router();

route.post("/risco-inundacao", verificarToken, riscoInundacao.criarRiscoInundacao);
route.get("/risco-inundacao/:id/bairro", riscoInundacao.listarRisco);
route.get("/risco-inundacao/:id", riscoInundacao.listarRiscoId);
route.get("/risco-inundacao", riscoInundacao.listarTodosRiscos);
route.put("/risco-inundacao/:id", riscoInundacao.atualizarRisco);
route.delete("/risco-inundacao/:id", riscoInundacao.deletarRisco);
route.get("/total-risco", riscoInundacao.totalRisco);
route.get("/risco-bairro", riscoInundacao.riscoPorBairro);
route.get("/risco-municipio", riscoInundacao.riscoPorMunicipio);

module.exports = route;