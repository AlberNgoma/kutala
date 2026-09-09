'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dados_clima', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chuva: {
        type: Sequelize.STRING
      },

      temperatura: {
        type: Sequelize.STRING
      },

      humidade: {
        type: Sequelize.STRING
      },

      descricao_clima: {
        type: Sequelize.STRING
      },

      bairro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'bairro', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        unique: true
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
    await queryInterface.dropTable('dados_clima');
  }
};