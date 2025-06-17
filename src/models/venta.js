'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    static associate(models) {
      Venta.belongsTo(models.User, {
        foreignKey: 'empleadoId',
        as: 'empleado'
      });

      Venta.hasMany(models.DetalleVenta, {
        foreignKey: 'ventaId',
        as: 'detalles'
      });
    }
  }

Venta.init({
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  empleadoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Venta',
  tableName: 'ventas'
});

  return Venta;
};