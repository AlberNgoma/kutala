'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('municipio', [
        { nome: "Camama", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Kilamba Kiaxi", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Talatona", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Viana", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Belas", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Ingombotas", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Kilamba", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Rangel", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Cacuaco", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Mulevo", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Cazenga", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Hoja Henda", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Sambizanga", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Samba", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Maianga", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { nome: "Mussulo", provincia_id: 1, createdAt: new Date(), updatedAt: new Date() }
      ])

      return console.log("Muncípios inseridos com sucesso!")


    } catch (error) {
      console.log("Erro ao inserir municípios ", error)

    }

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('municipio', null, {});

  }
};
