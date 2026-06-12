'use strict';
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  class perfil extends Model {
    static associate(models) {

      this.hasOne(models.cidadao, { foreignKey: 'perfil_id', as: 'cidadao' });
      this.hasOne(models.governador, { foreignKey: 'perfil_id', as: 'governador' });
      this.hasMany(models.comentario, {foreignKey : 'perfil_id', as : 'comentarios'});
      this.hasMany(models.alerta, {foreignKey : 'perfil_id', as : 'alertas'});
      this.hasMany(models.risco_inundacao, {foreignKey : 'perfil_id', as : 'riscoInundacao'})

    }
  }
  perfil.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tipo: DataTypes.ENUM('ADMIN', 'CIDADAO', 'GOVERNADOR'),
    resetToken : DataTypes.STRING,
    tokenExpires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'perfil',
    freezeTableName: true
  });
  return perfil;
};