'use strict';
const bairroMussulo = require("../data/novosBairrosMussulo.json")
module.exports = {
  async up(queryInterface, Sequelize) {

    const dados = bairroMussulo.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
      poligono: JSON.stringify(bairro.poligono),
      municipio_id: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    try {

      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do Mussulo inseridos com sucesso!")

    } catch (error) {
      console.log("Erro ao inserir bairros do Mussulo ", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
