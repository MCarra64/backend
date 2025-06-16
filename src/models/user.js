'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Venta, { foreignKey: 'empleadoId' });
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
    canAddInventory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    canAddSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
