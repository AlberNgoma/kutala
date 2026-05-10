'use strict';

const bairrosCazenga = require("../data/novosBairrosCazenga.json");

module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairrosCazenga.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
     poligono: JSON.stringify(bairro.poligono),
      municipio_id: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do municipio do Cazenga inseridos com sucesso")
    } catch (error) {
      console.log("Erro ao inserir bairros do Cazenga", error.message)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
