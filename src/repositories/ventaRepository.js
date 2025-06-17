const db = require('../models');
const Venta = db.Venta;
const DetalleVenta = db.DetalleVenta;
const Product = db.Product;
const User = db.User;

const getAllVentas = async () => {
  return await Venta.findAll({
    include: [
      { model: User, as: 'empleado' },
      {
        model: DetalleVenta,
        as: 'detalles',
        include: [{ model: Product, as: 'product' }]
      }
    ]
  });
};

const getVentaById = async (id) => {
  return await Venta.findByPk(id, {
    include: [
      { model: User, as: 'empleado' },
      {
        model: DetalleVenta,
        as: 'detalles',
        include: [{ model: Product, as: 'product' }]
      }
    ]
  });
};

const createVenta = async (ventaData, detallesData) => {
  return await db.sequelize.transaction(async (t) => {
    const venta = await Venta.create(ventaData, { transaction: t });

    for (const detalle of detallesData) {
      detalle.ventaId = venta.id;
      await DetalleVenta.create(detalle, { transaction: t });
    }

    return venta;
  });
};

const deleteVenta = async (id) => {
  return await db.sequelize.transaction(async (t) => {
    await DetalleVenta.destroy({ where: { ventaId: id }, transaction: t });
    return await Venta.destroy({ where: { id }, transaction: t });
  });
};

module.exports = {
  getAllVentas,
  getVentaById,
  createVenta,
  deleteVenta
};
