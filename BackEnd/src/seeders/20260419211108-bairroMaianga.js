'use strict';
const bairroMaianga = require("../data/novosBairrosMaianga.json");
module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairroMaianga.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
      poligono: JSON.stringify(bairro.poligono),
      municipio_id: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    try {

      await queryInterface.bulkInsert('bairro', dados)
      console.log("Bairros da Maianga inseridos com sucesso!")

    } catch (error) {
      console.log("Erro ao inserir bairros da Maianga ", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
