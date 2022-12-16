const express = require('express');
const router = express.Router();
const controller = require('../controllers/ApiController');

router.get('/list/:id', controller.productsList);

module.exports = router;