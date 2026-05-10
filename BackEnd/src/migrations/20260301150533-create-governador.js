'use strict';

module.exports =   {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('governador', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      cargo: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      perfil_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        references: { model: 'perfil', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      provincia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'provincia', key: 'id' }

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
    await queryInterface.dropTable('governador');
  }
};