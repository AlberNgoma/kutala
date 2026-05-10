'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dados_clima extends Model {
    
    static associate(models) {
      this.belongsTo(models.bairro, {foreignKey : 'bairro_id', as : 'bairro'});
    }
  }
  dados_clima.init({
    chuva: DataTypes.STRING,
    temperatura: DataTypes.STRING,
    humidade: DataTypes.STRING,
    descricao_clima: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'dados_clima',
    freezeTableName : true
  });
  return dados_clima;
};