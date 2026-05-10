const express = require("express");
const comentarioController = require("../controllers/comentarioController")
const verificarToken = require("../middlewares/checkToken")
const upload = require("../config/upload")

const route = express.Router();

route.post("/comentario", verificarToken, upload.single("foto") ,comentarioController.criarComentario);
route.get("/comentario/:id/bairro", comentarioController.listarComentarios);
route.put("/comentario/:id", comentarioController.actualizarComentario);
route.delete("/comentario/:id", comentarioController.deletarComentario);
route.get("/total-comentarios", comentarioController.totalComentarios);
module.exports = route;