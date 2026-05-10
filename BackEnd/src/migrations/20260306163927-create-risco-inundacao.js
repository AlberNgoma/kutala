'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('risco_inundacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nivel: {
        type: Sequelize.ENUM('ALTO', 'MEDIO', 'BAIXO'),
        allowNull: false
      },

      descricao: {
        type: Sequelize.STRING,
        allowNull: false
      },

      perfil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'perfil', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

      },

      bairro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'bairro', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      municipio_id : {
        type : Sequelize.INTEGER,
        allowNull : false, 
        references : {model : 'municipio', key : 'id'},
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
    await queryInterface.dropTable('risco_inundacao');
  }
};