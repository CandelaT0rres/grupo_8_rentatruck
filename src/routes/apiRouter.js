const { application } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ApiController');

//Vehiculos
router.get('/products', controller.vehiculos);
router.get('/list/:id', controller.vehiculosByPk);
router.get('/vehiculosCantidad', controller.vehiculosCantidad);
router.get('/vehiculosCategoria', controller.vehiculosCategoria);

//Usuarios
router.get('/usuarios', controller.usuarios);
router.get('/usuariosCantidad', controller.usuariosCantidad);

//Categorias
router.get('/categorias', controller.categorias);

//Marcas
router.get('/marcas', controller.marca);

//Carito
router.post('/checkout', controller.checkout);
module.exports = router;