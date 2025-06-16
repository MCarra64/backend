'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleVenta extends Model {
    static associate(models) {
      DetalleVenta.belongsTo(models.Venta, {
        foreignKey: 'ventaId',
        as: 'venta'
      });

      DetalleVenta.belongsTo(models.Product, {
        foreignKey: 'productoId',
        as: 'producto'
      });
    }
  }

  DetalleVenta.init({
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ventaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ventas',
        key: 'id'
      }
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'DetalleVenta',
  });

  return DetalleVenta;
};
