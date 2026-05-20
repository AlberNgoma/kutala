require("dotenv").config();

const Sequelize = require("sequelize");


const connection = new Sequelize
    (Process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: "mysql",
            port: process.env.DB_PORT,

            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }

    )

connection.authenticate().then((() => {
    console.log("Banco de dados conectado com sucesso!")
})).catch((error) => {
    console.log("Erro ao conectar ao banco de dados ", error)
});

module.exports = connection;
