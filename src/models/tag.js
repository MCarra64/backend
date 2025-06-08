'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Product, {
        through: 'ProductTags',
        as: 'products',
        foreignKey: 'tagId'
      });
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Product, { through: 'ProductTags', foreignKey: 'tagId', otherKey: 'productId' });
  };

  return Tag;
};
// Este modelo define una etiqueta que puede ser asociada a múltiples productos, permitiendo la clasificación o filtrado de productos por etiquetas.