'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class municipio extends Model {
    static associate(models) {
      this.belongsTo(models.provincia, { foreignKey: 'provincia_id', as: 'provincia' });
      this.hasMany(models.bairro, { foreignKey: 'municipio_id', as: 'bairros' });
      this.hasMany(models.risco_inundacao, { foreignKey: 'municipio_id', as: 'riscos_inundacao' });
      this.hasMany(models.alerta, { foreignKey: 'municipio_id', as: 'alerta' });
    }
  }
  municipio.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'municipio',
    freezeTableName: true
  });
  return municipio;
};