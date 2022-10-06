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
        let file = req.file;
        let accept = ['.jpg', '.png', '.gif', '.jpeg'];

        if (!file) {
            throw new Error('Debes cargar una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!accept.includes(fileExtension)) {
                throw new Error('Las extenciones permitidas son .jpg, .png, .gif')
            }
        }

        return true;
    })
]

module.exports = validaciones;