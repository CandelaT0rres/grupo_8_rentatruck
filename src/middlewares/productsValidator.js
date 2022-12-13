//Importo  express-validator
const { body } = require('express-validator');

// Crear validaciones
const validaciones = [
    body('modelo').notEmpty().withMessage('Debes ingresar un modelo'),
    body('ruta_img').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Debes cargar una imagen, las extenciones permitidas son: .jpg, .png, .gif, .jpeg')
        } 
        return true;
    }),
    body('marcas').notEmpty().withMessage('Seleccione una marca'),
    body('patente').notEmpty().withMessage('Ingrese una patente'),
    body('tipo_mercaderia').notEmpty().withMessage('Ingrese el tipo de mercaderia'),
    body('precio_km').notEmpty().withMessage('Ingrese el precio/km')
        .isNumeric().withMessage('Debe ingresar un valor numérico'),
    body('km').notEmpty().withMessage('Debe ingresar el kilometraje')
        .isNumeric().withMessage('Debe ingresar un valor numérico')
];

module.exports = validaciones;