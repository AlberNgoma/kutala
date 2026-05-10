'use strict';

const bairroBelas = require("../data/novosBairros-belas.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    const dados = bairroBelas.map(bairro => ({
      nome: bairro.nome,
      latitude: bairro.latitude,
      longitude: bairro.longitude,
      poligono: JSON.stringify(bairro.poligono),
      municipio_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    try {
      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros de Belas adicionados com sucesso!")

    } catch (error) {
      console.log("Erro ao inserir bairro de belas ", error.message)
    }

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})

  }
};
