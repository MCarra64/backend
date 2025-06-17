const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {
  return [
    body('username')
      .notEmpty()
      .withMessage('El nombre de usuario es requerido')
      .isLength({ max: 255 })
      .withMessage('El nombre de usuario no debe exceder los 255 caracteres'),
    
    body('password')
      .notEmpty()
      .withMessage('La contraseña es requerida')
      .isLength({ min: 6, max: 255 })
      .withMessage('La contraseña debe tener entre 6 y 255 caracteres')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  loginValidationRules,
  validate
};
