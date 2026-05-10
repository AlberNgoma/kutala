'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cidadao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      n_bi: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      perfil_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        references: { model: 'perfil', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'CASCADE'
      },

      bairro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'bairro', key: 'id' },
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
    await queryInterface.dropTable('cidadao');
  }
};