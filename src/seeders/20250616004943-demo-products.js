'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        code: 'CARNE001',
        name: 'Carne de res',
        provider: 'Proveedor A',
        costPrice: 100.00,
        salePrice: 150.00,
        stock: 50,
        categoryId: 1,  // Asegúrate que coincida con el ID de la categoría Carnes
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'VERD001',
        name: 'Zanahoria',
        provider: 'Proveedor B',
        costPrice: 10.00,
        salePrice: 15.00,
        stock: 100,
        categoryId: 2,  // Asegúrate que coincida con el ID de la categoría Verduras
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
