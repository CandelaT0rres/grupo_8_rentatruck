const { body } = require('express-validator');

const errorsLogin = [
    body('email').notEmpty().withMessage('Debes ingresar un E-Mail').isEmail().withMessage('Formato de E-Mail inválido'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña')
];

module.exports = errorsLogin;