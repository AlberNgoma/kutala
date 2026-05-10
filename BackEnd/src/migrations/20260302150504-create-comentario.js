'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comentario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      texto: {
        type: Sequelize.STRING,
        allowNull: false
      },

      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },

      
      perfil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'perfil', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      bairro_id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        references : {model : 'bairro', key : 'id'},
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      }, 

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comentario');
  }
};