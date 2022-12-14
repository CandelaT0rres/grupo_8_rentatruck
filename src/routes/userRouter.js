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
router.get('/registro/:id', authMiddleware, controller.editarUsuario);
router.put('/registro/:id', upload.single('img'), validaciones, controller.updateUsuario);


//Vista y proceso login
router.get('/login', logueadoMiddleware, controller.login);
router.post('/login', validacionesLogin, controller.procesoLogin);

//Perfil
router.get('/perfil', authMiddleware, controller.perfil);

//Logout Usuario y Soft Delete
router.get('/logout', authMiddleware, controller.logout);
router.delete('/deleteUser/:id', authMiddleware, controller.borrar);

//Recuperar usuario
router.get('/recuperar', guestMiddleware, controller.recuperarUsuario);
router.post('/recuperar', guestMiddleware, controller.UsuarioRecuperado);

//Pedidos realizados
router.get('/pedidos/:id', authMiddleware, controller.pedidos)

module.exports = router;