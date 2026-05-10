'use strict';

const bairroMulevo = require("../data/novosBairrosMulevo.json");
module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairroMulevo.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
     poligono: JSON.stringify(bairro.poligono),
      municipio_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do municipio do Mulevo inseridos com sucesso")
    } catch (error) {
      console.log("Erro ao inserir bairros do Mulevo", error.message)
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
