'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class risco_inundacao extends Model {
   
    static associate(models) {
      this.belongsTo(models.perfil, {foreignKey : 'perfil_id', as : 'perfil'});
      this.belongsTo(models.bairro, {foreignKey : 'bairro_id', as : 'bairro'});
      this.belongsTo(models.municipio, {foreignKey : 'municipio_id', as : 'municipio'});
    }
  }
  risco_inundacao.init({
    nivel: DataTypes.ENUM('ALTO', 'MEDIO', 'BAIXO'),
    descricao : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'risco_inundacao',
    freezeTableName : true
  });
  return risco_inundacao;
};