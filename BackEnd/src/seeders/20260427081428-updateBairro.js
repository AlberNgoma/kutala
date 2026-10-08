'use strict';

const bairrosCriticos = require("../data/bairros_criticos.json")

const { TileSet } = require("node-hgt");
const table = require("../models/index.js");

module.exports = {
  
  async up(queryInterface, Sequelize) {
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('bairro',
      { nivel_risco: 'BAIXO' },
      { nome: bairrosCriticos }
    )
  }
};
