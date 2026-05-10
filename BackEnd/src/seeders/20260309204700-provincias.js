'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    try {

      await queryInterface.bulkInsert('provincia', [
        { nome: "Luanda", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Benguela", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Bengo", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Bié", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Cabinda", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Cuando", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Cuanza Norte", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Cuanza Sul", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Cubango", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Cunene", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Huambo", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Huila", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Icolo e Bengo", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Lunda Norte", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Lunda Sul", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Malanje", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Moxico", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Moxico Leste", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Namibe", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Uíge", createdAt: new Date(), updatedAt: new Date() },
        { nome: "Zaire", createdAt: new Date(), updatedAt: new Date() }

      ])
      return console.log("Províncias inseridas com sucesso!")

    } catch (error) {
      console.log("Erro ao inserir províncias ", error)
    }

  },




  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('provincia', null, {})

  }
};
