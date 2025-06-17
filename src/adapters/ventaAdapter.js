const ventaRepository = require('../repositories/ventaRepository');

const getAllVentas = async () => {
  return await ventaRepository.getAllVentas();
};

const getVentaById = async (id) => {
  return await ventaRepository.getVentaById(id);
};

const createVenta = async (ventaData, detallesData) => {
  return await ventaRepository.createVenta(ventaData, detallesData);
};

const deleteVenta = async (id) => {
  return await ventaRepository.deleteVenta(id);
};

module.exports = {
  getAllVentas,
  getVentaById,
  createVenta,
  deleteVenta
};
