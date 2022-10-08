//Importación Expres + ejecución
const express = require('express');
const router = express.Router();

//Importación controlador
const controller = require('../controllers/userController');

//Importación multer
const upload = require('../middlewares/multerUsers');

//Importación validaciones
const validaciones = require('../middlewares/usersValidator');

//Vista Form registro
router.get('/registro',  controller.registro);
router.post('/registro', upload.single('img'), validaciones, controller.nuevoUsuario);

//Vista Form login
router.get('/login', controller.login);

module.exports = router;