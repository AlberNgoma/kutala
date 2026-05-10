'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('municipio', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },

      provincia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'provincia', key: 'id' },
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
    await queryInterface.dropTable('municipio');
  }
};