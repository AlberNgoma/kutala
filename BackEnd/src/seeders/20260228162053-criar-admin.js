'use strict';
const bcrypt = require("bcrypt")
module.exports =   {
  async up(queryInterface, Sequelize) {
    const password = "cogeAnderson"
    try {
      const senhaSegura = await bcrypt.hash(password, (10))
      await queryInterface.bulkInsert('perfil', [{
        nome: 'Admin',
        email: 'admingeosig@gmail.com',
        password: senhaSegura,
        tipo: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      }])  

        console.log("Admin criado com sucesso!")





    } catch (error) {
      console.log("Erro ao criar admin ", error)
    }



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('perfil', null, {});
  }
};
