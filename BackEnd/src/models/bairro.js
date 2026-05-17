'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bairro extends Model {
    static associate(models) {
      this.belongsTo(models.municipio, { foreignKey: 'municipio_id', as: 'municipio' });
      this.hasMany(models.dados_clima, { foreignKey: 'bairro_id', as: 'dadosClima' });
      this.hasMany(models.dados_actual, { foreignKey: 'bairro_id', as: 'dadosActual' });
      this.hasMany(models.alerta, { foreignKey: 'bairro_id', as: 'alertas' });
      this.hasMany(models.comentario, { foreignKey: 'bairro_id', as: 'comentarios' });
      this.hasMany(models.risco_inundacao, { foreignKey: 'bairro_id', as: 'riscos' });
      this.hasMany(models.cidadao, { foreignKey: 'bairro_id', as: 'cidadaos' });
    }
  }
  bairro.init({
    nome: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    poligono: DataTypes.JSON,
    nivel_risco: DataTypes.ENUM('ALTO', 'BAIXO')
  }, {
    sequelize,
    modelName: 'bairro',
    freezeTableName: true
  });
  return bairro;
};