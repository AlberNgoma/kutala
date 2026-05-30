const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron")
const path = require("path");


const loginRoute = require("./routes/loginRoute");
const cidadaoRoute = require("./routes/cidadaoRoute");
const comentarioRoute = require("./routes/comentarioRoute");
const alertaRoute = require("./routes/alertaRoute");
const governadorRoute = require("./routes/governadorRoute");
const provinciaRoute = require("./routes/provinciaRoute");
const municipiosRoute = require("./routes/municipioRoute");
const bairrosRoute = require("./routes/bairroRoute");
const riscoInundacaoRoute = require("./routes/riscoInundacaoRoute")
const climaRoute = require("./routes/climaRoute");

//require("./jobs/climaJob");


const app = express();
app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://kutala.vercel.app"
    ]
}));
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));





app.use('/', loginRoute);
app.use('/', cidadaoRoute);
app.use('/', comentarioRoute);
app.use('/', alertaRoute);
app.use('/', governadorRoute);
app.use('/', provinciaRoute);
app.use('/', municipiosRoute);
app.use('/', bairrosRoute);
app.use('/', riscoInundacaoRoute)
app.use('/', climaRoute);




app.listen(5000, () => {
    console.log("Servidor funcionando....")
})