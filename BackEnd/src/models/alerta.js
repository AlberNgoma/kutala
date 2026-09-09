'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class alerta extends Model {

    static associate(models) {
      this.belongsTo(models.perfil, { foreignKey: 'perfil_id', as: 'perfil' });
      this.belongsTo(models.bairro, { foreignKey: 'bairro_id', as: 'bairro' });
      this.belongsTo(models.municipio, { foreignKey: 'municipio_id', as: 'municipio' });
      this.belongsTo(models.dados_clima, {foreignKey : 'dados_clima_id', as : 'dados_clima'})

    }
  }
  alerta.init({
    nivel_alerta: DataTypes.ENUM('ALTO', 'MEDIO', 'BAIXO'),
    descricao: DataTypes.STRING,
    status: DataTypes.ENUM('PENDENTE', 'RESOLVIDO')
  }, {
    sequelize,
    modelName: 'alerta',
    freezeTableName: true
  });
  return alerta;
};