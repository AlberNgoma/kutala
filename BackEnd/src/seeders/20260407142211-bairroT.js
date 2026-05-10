'use strict';
const bairroTalatona = require("../data/novosBairrosTalatona.json");
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      
      const dados = bairroTalatona.map(bairro=>({
        nome : bairro.nome,
        latitude : bairro.latitude,
        longitude : bairro.longitude,
        poligono : JSON.stringify(bairro.poligono),
        municipio_id : 3,
        createdAt : new Date(),
        updatedAt : new Date()
      }))


      await queryInterface.bulkInsert('bairro', dados);
      console.log("Bairros do talatona adicionados com sucesso!");

    } catch (error) {
      console.log("Erro ao adicionar bairros do talatona ", error);
    }


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bairro', null, {});
  }
};
