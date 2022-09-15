const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');


router.get('/productos', controller.productos);
router.get('/carrito',  controller.carrito);

module.exports = router;
 


