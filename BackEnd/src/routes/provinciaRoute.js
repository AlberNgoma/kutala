const express = require("express");
const provincia = require("../controllers/provinciaController");

const route = express.Router();

route.get("/provincias", provincia.listarProvincias);

module.exports = route;