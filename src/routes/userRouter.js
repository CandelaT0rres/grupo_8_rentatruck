//Importación Expres + ejecución
const express = require('express');
const router = express.Router();

// Middlewares de ruta / usuarios
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const logueadoMiddleware = require('../middlewares/logueadoMiddlwares');

//Importación controlador
const controller = require('../controllers/userController');

//Importación multer
const upload = require('../middlewares/multerUsers');

//Importación validaciones
const validaciones = require('../middlewares/usersValidator');
const validacionesLogin = require('../middlewares/loginValidator');

//Vista y proceso registro
router.get('/registro', guestMiddleware,  controller.registro);
router.post('/registro', upload.single('img'), validaciones, controller.nuevoUsuario);

//Vista y edición de usuario
router.get('/registro/:id', controller.editarUsuario);
router.put('/registro/:id', upload.single('img'), validaciones, controller.updateUsuario);


//Vista y proceso login
router.get('/login', logueadoMiddleware, controller.login);
router.post('/login', validacionesLogin, controller.procesoLogin);

//Perfil
router.get('/perfil', guestMiddleware, controller.perfil);

//LOGOUT USUARIO
router.get('/logout', authMiddleware, controller.logout);

// RUTA DE PRUEBA LOGIN
router.get('/check', function (req, res) {
    if (req.session.usuarioLogueado == undefined) {
        res.send('No estas logueado')
    } else {
        res.send('Estas logueado')
    }
});

module.exports = router;