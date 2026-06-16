const express = require("express")
const loginController = require("../controllers/loginController");

const route = express.Router()

route.post('/login',loginController.login);
route.post('/recuperar-conta', loginController.recuperarConta);
route.put('/redefinir-senha/:token', loginController.redefinirSenha)
module.exports = route;