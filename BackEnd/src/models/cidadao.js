'use strict';
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cidadao extends Model {

    static associate(models) {
      this.belongsTo(models.perfil, { foreignKey: 'perfil_id', as: 'perfil' });
      this.belongsTo(models.bairro, {foreignKey : 'bairro_id', as : 'bairro'});
    }
  }
  cidadao.init({
    n_bi : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cidadao',
    freezeTableName: true
  });
  return cidadao;
};