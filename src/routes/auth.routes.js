const express = require('express');
const authController = require('../controllers/authController');
const { loginValidationRules, validate } = require('../middleware/validaciones/login');

const router = express.Router();

// Login
router.post('/login', loginValidationRules(), validate, authController.login);

// Cambiar contraseña
router.put('/cambiarClave/:id', authController.cambiarClave);

// CRUD de usuarios
router.get('/', authController.getAllUsers);
router.get('/:id', authController.getUserById);
router.post('/', authController.createUser);
router.put('/:id', authController.updateUser);
router.delete('/:id', authController.deleteUser);

module.exports = router;