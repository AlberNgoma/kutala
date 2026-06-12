'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

   try {
     await queryInterface.addColumn('perfil', 'resetToken', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('perfil', 'tokenExpires', {
      type: Sequelize.DATE,
      allowNull: true
    })

    console.log("Novos Campos adicionados com sucesso")
   } catch (error) {
    console.log(`Erro ao adicionar novos campos ${error}`)
   }

    


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('perfil','resetToken')
    await queryInterface.removeColumn('perfil','tokenExpires')
   
  }
};
