'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bairro', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      nome: {
        type: Sequelize.STRING

      },

      latitude: {
        type: Sequelize.STRING,
        allowNull: false
      },

      longitude: {
        type: Sequelize.STRING,
        allowNull: false
      },

      poligono: {
        type: Sequelize.JSON,
        allowNull: false
      },


      vulnerabilidade: {
        type: Sequelize.ENUM('ALTA', 'BAIXA'),
        allowNull: true
      },

      municipio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'municipio', as: 'key' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('bairro');
  }
};