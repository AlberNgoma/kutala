'use strict';
const bairros = require("../data/novosBairros-camama.json")
module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairros.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
      poligono: JSON.stringify(bairro.poligono),
      municipio_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('bairro', dados);
    console.log("Bairros do município do camama inseridos com sucesso!")

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {});
  }
};