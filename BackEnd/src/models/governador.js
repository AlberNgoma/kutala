'use strict';
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  class governador extends Model {
    static associate(models) {

      this.belongsTo(models.perfil, { foreignKey: 'perfil_id', as: 'perfil' });
      this.belongsTo(models.provincia, { foreignKey: 'provincia_id', as: 'provincia' });

    }
  }
  governador.init({
    cargo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'governador',
    freezeTableName: true
  });
  return governador;
};