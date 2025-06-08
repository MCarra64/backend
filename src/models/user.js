'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Aquí se pueden definir relaciones con otros modelos si es necesario
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('jefe', 'empleado'),
      defaultValue: 'empleado'
    },
    canAccessResumen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    canAccessControlPersonal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
// Este modelo define un usuario con campos para nombre de usuario, nombre completo, contraseña, rol y permisos de acceso.