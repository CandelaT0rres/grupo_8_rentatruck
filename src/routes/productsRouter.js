//Importo Express + Ejecuto método Router
const express = require('express');
const router = express.Router();

//Importo Path
const path = require('path');

//Importo multer + seteo multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img'));
    },
    filename: (req, file, cb) =>{
        let nombreImg = 'camiones-' + Date.now() + path.extname(file.originalname);
        cb(null, nombreImg);
    }
});
const upload = multer({storage : storage});

//Importo Controlador
const controller = require('../controllers/productsController');

//Vista Productos
router.get('/productos', controller.productos);

//Vista Carrito
router.get('/carrito', controller.carrito);

//Nuevo producto
router.get('/cargar', controller.cargar);
router.post('/cargar',upload.single('rutaImg'), controller.guardar);

//Editar producto
router.get('/editar/:id', controller.editar);
router.put('/editar/:id',upload.single('rutaImg'),controller.actualizar);

//Borrado producto
router.delete('/borrar/:id', controller.borrar);

module.exports = router;
