const path = require('path');
const { body } = require('express-validator');

// Crear validaciones
const validaciones = [
    body('nombre').notEmpty().withMessage('Debes completar el campo Nombre'),
    body('marca').notEmpty().withMessage('Debes completar el campo Marca'),
    body('modelo').notEmpty().withMessage('Debes completar el campo Modelo'),
    body('tipoC').notEmpty().withMessage('Debes completar el campo Tipo de carga'),
    body('origen').notEmpty().withMessage('Debes completar el campo Origen'),
    body('recorrido').notEmpty().withMessage('Debes completar el campo Recorrido'),
    body('precioKm').notEmpty().withMessage('Debes completar el campo Precio'),
    body('rutaImg').custom((value, { req }) => {
        let file = req.file;
        let accept = ['.jpg', '.png', '.gif'];

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