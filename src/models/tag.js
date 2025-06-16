'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Product, {
        through: 'ProductTags',
        as: 'products',
        foreignKey: 'tagId',
        otherKey: 'productId'
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

  return Tag;
};