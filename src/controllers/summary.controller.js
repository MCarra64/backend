const db = require('../models');
const { Op } = require('sequelize');
const Sale = db.Venta;

const getSummary = async (req, res) => {
  try {
    const { period, year, month } = req.query;

    const now = new Date();
    let startDate, endDate;

    if (period === 'semanal') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      endDate = new Date(startOfWeek);
      endDate.setDate(endDate.getDate() + 7);
      startDate = startOfWeek;
    } else if (period === 'mensual' && year && month) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 1);
    } else if (period === 'anual' && year) {
      startDate = new Date(year, 0, 1);
      endDate = new Date(parseInt(year) + 1, 0, 1);
    } else {
      return res.status(400).json({ error: 'Parámetros inválidos' });
    }

    const sales = await Sale.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    let bruto = 0;
    let gasto = 0;

    sales.forEach((s) => {
      bruto += s.total;
      gasto += s.cost;
    });

    const neto = bruto - gasto;

    return res.json({
      bruto,
      neto,
      gasto,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getSummary };
