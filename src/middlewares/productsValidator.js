//Importo path + express-validator
const path = require('path');
const { body } = require('express-validator');

// Crear validaciones
const validaciones = [
    body('modelo').notEmpty().withMessage('Debes ingresar un modelo'),
    body('ruta_img').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Debes cargar una imagen, las extenciones permitidas son: .jpg, .png, .gif, .jpeg')
        } 
        return true;
    })
]

module.exports = validaciones;