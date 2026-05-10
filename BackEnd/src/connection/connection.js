const Sequelize = require("sequelize");


const connection = new Sequelize
    ("inundacoes", "root", "Albertongoma", { host: "localhost", dialect: "mysql" })

connection.authenticate().then((() => {
    console.log("Banco de dados conectado com sucesso!")
})).catch((error) => {
    console.log("Erro ao conectar ao banco de dados ", error)
});

module.exports = connection;
