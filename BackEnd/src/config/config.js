require("dotenv").config()

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port : process.env.DB_PORT,
    dialect: "mysql"
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port : process.env.DB_PORT,
    dialect: "mysql"
  },

  production: {
    username: process.env.DB_USER_ONLINE,
    password: process.env.DB_PASSWORD_ONLINE,
    database: process.env.DB_NAME_ONLINE,
    host: process.env.DB_HOST_ONLINE,
    port : process.env.DB_PORT_ONLINE,
    dialect: "mysql"
  }
}
