const { application } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ApiController');

//Vehiculos
router.get('/products', controller.vehiculos);
router.get('/list/:id', controller.vehiculosByPk);
router.get('/vehiculosCantidad', controller.vehiculosCantidad);

//Usuarios
router.get('/usuarios', controller.usuarios);
router.get('/usuariosCantidad', controller.usuariosCantidad);

//Categorias
router.get('/categorias', controller.categorias);
router.get('/categoriasVehiculo', controller.categoriasVehiculo);

//Marcas
router.get('/marcas', controller.marca);
router.get('/marcasCantidad', controller.marcaCantidad);

//Carito
router.post('/checkout', controller.checkout);
module.exports = router;