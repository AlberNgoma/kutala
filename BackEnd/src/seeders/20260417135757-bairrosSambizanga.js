'use strict';

const bairrosSambizanga = require("../data/novosBairrosSambizanga.json");

module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairrosSambizanga.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
     poligono: JSON.stringify(bairro.poligono),
      municipio_id: 13,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do municipio do Sambizanga inseridos com sucesso")
    } catch (error) {
      console.log("Erro ao inserir bairros do Sambizanga", error.message)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
