'use strict';
const bairrosCacuaco = require("../data/novosBairrosCacuaco.json");
module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairrosCacuaco.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
     poligono: JSON.stringify(bairro.poligono),
      municipio_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

   try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do municipio do Cacuaco inseridos com sucesso")
    } catch (error) {
      console.log("Erro ao inserir bairros do Cacuaco", error.message)
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
