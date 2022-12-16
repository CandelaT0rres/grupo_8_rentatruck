const express = require('express');
const router = express.Router();
const controller = require('../controllers/ApiController');
const router = require('./homeRouter');

router.get('/list', controller.productsList);

module.exports = router;