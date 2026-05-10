'use strict';
const bairroRangel = require("../data/novosBairrosRangel.json")
module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairroRangel.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
      poligono: JSON.stringify(bairro.poligono),
      municipio_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do municipio do Rangel inseridos com sucesso")
    } catch (error) {
      console.log("Erro ao inserir bairros do Rangel", error.message)
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
