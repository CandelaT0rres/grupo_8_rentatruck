//Importo Express + Ejecuto método Router 
const express = require('express');
const router = express.Router();

//Importo validaciones + multer
const validaciones = require('../middlewares/productsValidator');
const upload = require('../middlewares/multerProducts');

//Middlewares
const authMiddleware = require('../middlewares/authMiddleware');


//Importo Controlador
const controller = require('../controllers/productsController');

//Vista Productos
router.get('/productos', controller.productos);

//Vista individual
router.get('/detalle/:id', controller.detalle);

//Vista Carrito
router.get('/carrito', authMiddleware, controller.carrito);

//Nuevo producto
router.get('/cargar', authMiddleware, controller.cargar);
router.post('/cargar', upload.single('ruta_img'), validaciones, controller.guardar); //Guardar un producto nuevo

//Editar producto
router.get('/editar/:id' ,authMiddleware, controller.editar);
router.put('/editar/:id', upload.single('rutaImg'), validaciones, controller.actualizar);

//Borrado producto
router.delete('/borrar/:id', authMiddleware, controller.borrar);

module.exports = router;
