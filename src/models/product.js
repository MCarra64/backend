'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });

      Product.belongsToMany(models.Tag, {
        through: 'ProductTags',
        as: 'tags',
        foreignKey: 'productId'
      });
    }
  }
  Product.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    provider: DataTypes.STRING,
    costPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    salePrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Product.belongsToMany(models.Tag, { through: 'ProductTags', foreignKey: 'productId', otherKey: 'tagId', as: 'tags' });
  };

  return Product;
};
// Este modelo define un producto con campos para código, nombre, proveedor, precios, stock y una relación con la categoría a la que pertenece.