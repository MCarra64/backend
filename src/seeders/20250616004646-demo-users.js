'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'jefe1',
        fullName: 'Jefe Principal',
        password: '123456',  // ¡IMPORTANTE! Esto es solo para prueba. En producción usar hash.
        role: 'jefe',
        canAccessResumen: true,
        canAccessControlPersonal: true,
        canAddSale: true,
        canAddInventory: true,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'empleado1',
        fullName: 'Empleado Uno',
        password: 'abcdef',
        role: 'empleado',
        canAccessResumen: false,
        canAccessControlPersonal: false,
        canAddSale: true,
        canAddInventory: false,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
