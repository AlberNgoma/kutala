'use strict';

const bairrosHoji = require("../data/novosBairrosHoji.json");

module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairrosHoji.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
     poligono: JSON.stringify(bairro.poligono),
      municipio_id: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do municipio do Hoji Henda inseridos com sucesso")
    } catch (error) {
      console.log("Erro ao inserir bairros do Hoji Henda", error.message)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
