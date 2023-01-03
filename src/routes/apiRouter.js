const { application } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/ApiController');

router.get('/products', controller.products);
router.get('/list/:id', controller.productsList);
router.post('/checkout', controller.checkout);

router.get('/users', controller.users);

module.exports = router;