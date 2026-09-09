'use strict';

const dados_clima = require("../models/dados_clima");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alerta', {
      
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      nivel_alerta: {
        type: Sequelize.ENUM('ALTO', 'MEDIO', 'BAIXO'),
        allowNull: false
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM('PENDENTE', 'RESOLVIDO'),
        allowNull: false,
        defaultValue: 'PENDENTE'
      },

      perfil_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'perfil', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'CASCADE'
      },

      bairro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'bairro', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'CASCADE',
        unique: true
      },

      municipio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'municipio', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'CASCADE'
      },
      
      dados_clima_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'dados_clima', key: 'id' },
        onUpdade: 'CASCADE',
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
    await queryInterface.dropTable('alerta');
  }
};