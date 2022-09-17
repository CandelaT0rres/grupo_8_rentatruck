const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');


router.get('/productos', controller.productos);
router.get('/carrito',  controller.carrito);
router.get('/cargar',  controller.cargar);
router.get('/editar',  controller.editar);

module.exports = router;
 


