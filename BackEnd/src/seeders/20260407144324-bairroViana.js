'use strict';
const bairroViana = require("../data/novosBairrosViana.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const dados = bairroViana.map(bairro => ({
        nome: bairro.nome,
        latitude: bairro.latitude,
        longitude: bairro.longitude,
        poligono: JSON.stringify(bairro.poligono),
        municipio_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }))

      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros de viana adicionados com sucesso!")

    } catch (error) {
      console.log("Erro ao inserir bairros de viana");
    }


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {})
  }
};
