'use strict';
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comentario extends Model {

    static associate(models) {
      this.belongsTo(models.perfil, {foreignKey : 'perfil_id', as : 'perfil'});
      this.belongsTo(models.bairro, {foreignKey : 'bairro_id', as : 'bairro'});

    }
  }
  comentario.init({
    texto: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comentario',
    freezeTableName: true
  });
  return comentario;
};