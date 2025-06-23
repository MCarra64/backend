const ventaAdapter = require('../adapters/ventaAdapter');

const getAllVentas = async (req, res) => {
  try {
    const ventas = await ventaAdapter.getAllVentas();
    res.status(200).json(ventas);
  } catch (error) {
    console.error('ERROR EN getAllVentas:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


const getVentaById = async (req, res) => {
  try {
    const venta = await ventaAdapter.getVentaById(req.params.id);
    if (!venta) {
      return res.status(404).json({ message: 'Venta not found' });
    }
    res.status(200).json(venta);
  } catch (error) {
    console.error('Error fetching venta:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createVenta = async (req, res) => {
  try {
    const { venta, detalles } = req.body;
    const newVenta = await ventaAdapter.createVenta(venta, detalles);
    res.status(201).json(newVenta);
  } catch (error) {
    console.error('Error creating venta:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteVenta = async (req, res) => {
  try {
    const result = await ventaAdapter.deleteVenta(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Venta not found' });
    }
    res.status(200).json({ message: 'Venta deleted' });
  } catch (error) {
    console.error('Error deleting venta:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllVentas,
  getVentaById,
  createVenta,
  deleteVenta
};
