const express = require("express");
const alertaController = require("../controllers/alertaController");
const verificarToken = require("../middlewares/checkToken")

const route = express.Router();

route.post("/alerta", verificarToken, alertaController.criarAlerta)
route.get("/alertas/:id/bairro", alertaController.listarAlertas);
route.get("/todos-alertas", alertaController.listarTodosAlertas);
route.get("/todos-alertas/:id", alertaController.listarAlertId);
route.put("/alerta/:id", alertaController.actualizarAlerta);
route.delete("/alerta/:id", alertaController.deletarAlerta);
route.get("/total-alerta", alertaController.totalAlerta);
route.get("/total-alerta/:id", alertaController.todalAlertaMunicipio);
route.get("/alerta-bairro", alertaController.alertaPorBairro);
route.get("/alerta-data", alertaController.alertaPorData);
route.get("/alerta-nivel", alertaController.alertaPorNivel);
route.get("/alerta-pendente", alertaController.alertasPendentes);
route.post("/alerta/risco-inundacao/:id", verificarToken, alertaController.emitirRisco);

module.exports = route;