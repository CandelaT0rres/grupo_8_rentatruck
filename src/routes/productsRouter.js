//Importo Express + Ejecuto método Router
const express = require('express');
const router = express.Router();
const validaciones = require('../middlewares/productsValidator');

//Importo middlewares-multer
const upload = require("../middlewares/multer"); 


//Importo Controlador
const controller = require('../controllers/productsController');

//Vista Productos
router.get('/productos', controller.productos);

//Vista individual
router.get('/detalle/:id', controller.detalle);

//Vista Carrito
router.get('/carrito', controller.carrito);

//Nuevo producto
router.get('/cargar', controller.cargar);
router.post('/cargar',upload.single('rutaImg'), validaciones, controller.guardar);

//Editar producto
router.get('/editar/:id', controller.editar);
router.put('/editar/:id',upload.single('rutaImg'), controller.actualizar);

//Borrado producto
router.delete('/borrar/:id', controller.borrar);

module.exports = router;
