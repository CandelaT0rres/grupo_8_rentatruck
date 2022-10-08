//Importación Expres + ejecución
const express = require('express');
const router = express.Router();

//Importación controlador
const controller = require('../controllers/userController');

//Importación multer
const upload = require('../middlewares/multerUsers');

//Importación validaciones
const validaciones = require('../middlewares/usersValidator');

//Vista y proceso registro
router.get('/registro',  controller.registro);
router.post('/registro', upload.single('img'), validaciones, controller.nuevoUsuario);

//Vista y proceso login
router.get('/login', controller.login);
router.post('/login', controller.procesoLogin);

//LOGOUT USUARIO
router.get('/logout', controller.logout);

// RUTA DE PRUEBA LOGIN
router.get('/check', function (req, res) {
    if (req.session.usuarioLogueado == undefined) {
        res.send('No estas logueado')
    } else {
        res.send('Estas logueado')
    }
});

module.exports = router;