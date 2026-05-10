'use strict';
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class provincia extends Model {

    static associate(models) {
      this.hasOne(models.governador, { foreignKey: 'provincia_id', as: 'governador' })
      this.hasMany(models.municipio, {foreignKey : 'provincia_id', as: 'municipios'});
    }

  }
  provincia.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'provincia',
    freezeTableName: true
  });
  return provincia;
};