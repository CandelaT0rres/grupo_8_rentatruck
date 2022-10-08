//Importo path
const path = require('path');

//Importo express-validator
const { body } = require('express-validator');

const errors = [
    body('nombre').notEmpty().withMessage('Debe ingresar un nombre'),
    body('direccion').notEmpty().withMessage('Debe ingresar una dirección'),
    body('apellido').notEmpty().withMessage('Debe ingresar su apellido o nombre Fantasía'),
    body('dni').notEmpty().withMessage('Debe ingresar DNI'),
    body('ciudad').notEmpty().withMessage('Debe agregar una ciudad'),
    body('provincia').notEmpty().withMessage('Debe agregar una provincia'),
    body('email').notEmpty().withMessage('Debe ingresar un email')
        .isEmail().withMessage('ingrese un email valido'),
    body('password').notEmpty().withMessage('Debe ingresar la contraseña'),
    body('img').custom((value, { req }) => {
      if (!req.file) {
        throw new Error ('Debes cargar una imagen, las extenciones permitidas son: .jpg, .png, .gif, .jpeg')
      }
      return true
    })

];

module.exports = errors;