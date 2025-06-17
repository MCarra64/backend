const express = require('express');
const ventaController = require('../controllers/ventaController');
const router = express.Router();

router.get('/', ventaController.getAllVentas);
router.get('/:id', ventaController.getVentaById);
router.post('/', ventaController.createVenta);
router.delete('/:id', ventaController.deleteVenta);

module.exports = router;
