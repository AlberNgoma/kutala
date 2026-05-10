'use strict';
const bairrokilamba = require("../data/novosBairros-kilamba.json")

module.exports = {
  async up(queryInterface, Sequelize) {
    const dados = bairrokilamba.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
      poligono: JSON.stringify(bairro.poligono),
      municipio_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do Kilamba inseridos com sucesso!")
    } catch (error) {
      console.log("Erro ao inserir bairros do Kilamba ", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
