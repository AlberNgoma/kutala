'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dados_actual', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      chuva: {
        type: Sequelize.STRING,
        allowNull: false
      },

      temperatura: {
        type: Sequelize.STRING,
        allowNull: false
      },

      humidade: {
        type: Sequelize.STRING,
        allowNull: false
      },

      descricao_clima: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('dados_actual');
  }
};