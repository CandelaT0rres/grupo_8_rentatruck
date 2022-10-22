//Importo path + express-validator
const path = require('path');
const { body } = require('express-validator');

// Crear validaciones
const validaciones = [
    body('nombre').notEmpty().withMessage('Debes ingresar un nombre'),
    body('marca').notEmpty().withMessage('Debes ingresar una marca'),
    body('modelo').notEmpty().withMessage('Debes ingresar un modelo'),
    body('tipoC').notEmpty().withMessage('Debes agregar el tipo de carga'),
    body('origen').notEmpty().withMessage('Debes ingresar un Origen'),
    body('recorrido').notEmpty().withMessage('Debes ingresar un recorrido'),
    body('precioKm').notEmpty().withMessage('Debes ingresar un recio'),
    body('rutaImg').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Debes cargar una imagen, las extenciones permitidas son: .jpg, .png, .gif, .jpeg')
        } 
        return true;
    })
]

module.exports = validaciones;