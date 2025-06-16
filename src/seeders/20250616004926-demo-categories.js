'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Carnes',
        description: 'Productos de carnes frescas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Verduras',
        description: 'Productos de verduras y hortalizas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
