'use strict';
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class alerta extends Model {

    static associate(models) {
      this.belongsTo(models.perfil, {foreignKey : 'perfil_id', as : 'perfil'});
      this.belongsTo(models.bairro, {foreignKey : 'bairro_id', as : 'bairro'});
      this.belongsTo(models.municipio, {foreignKey : 'municipio_id', as : 'municipio'});

    }
  }
  alerta.init({
    titulo: DataTypes.STRING,
    mensagem: DataTypes.STRING,
    nivel_alerta: DataTypes.ENUM('ALTO', 'MEDIO', 'BAIXO'),
    status : DataTypes.ENUM('PENDENTE', 'RESOLVIDO')
  }, {
    sequelize,
    modelName: 'alerta',
    freezeTableName: true
  });
  return alerta;
};