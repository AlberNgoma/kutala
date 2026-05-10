'use strict';
const bairroIngo = require("../data/novosBairros-ingo.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dados = bairroIngo.map(bairro => ({
          nome: bairro.nome,
          latitude: bairro.latitude,
          longitude: bairro.longitude,
          poligono: JSON.stringify(bairro.poligono),
          municipio_id: 6,
          createdAt: new Date(),
          updatedAt: new Date()
        }))

    try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros da ingombota inseridos com sucesso!")
    } catch (error) {
      console.log("Erro ao inserir bairros da ingombota ", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
