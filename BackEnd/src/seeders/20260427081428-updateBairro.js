'use strict';

const bairrosCriticos = require("../data/bairros_criticos.json")
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkUpdate('bairro',
      { nivel_risco: 'ALTO' },
      { nome: bairrosCriticos }
    )

    console.log("Bairros actualizados com sucesso!")


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('bairro',
      { nivel_risco: 'BAIXO' },
      { nome: bairrosCriticos }
    )
  }
};
