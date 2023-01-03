//Importación servicios + express validator
const {validationResult} = require('express-validator');
const userServices = require('../services/userServices');
const userController = {
   //Vista Form Registro 
   registro: async(req , res) => {
      let rol = await userServices.rol()
      res.render ('./users/registro', {rol})
   },
   //Creación de usuario
   nuevoUsuario: async (req, res) =>{
      let errors = validationResult(req);
      if(errors.isEmpty()){
         let rol = await userServices.rol()
         await userServices.nuevoUsuario(req) ? res.redirect('/user/login') :  res.render('./users/registro', {errors:{email:{msg: '¡Este email ya está registrado!'}}, oldData:req.body, rol});    
      }else{
         let rol = await userServices.rol();
         res.render('./users/registro', {errors: errors.mapped(), oldData: req.body, rol});
      }; 
   },
   //Vista y edición de usuario
   editarUsuario: async (req, res) => {
      let usuario= await userServices.usuarioPk(req)
      let rol= await userServices.rol()
      res.render('./users/user-edit', {usuario, rol});  
   },
   updateUsuario: async (req, res) => {
      let errors = validationResult(req);
      if(errors.isEmpty()){
         await userServices.actualizarUsuario(req)
         res.redirect('/user/perfil');
      }else{
         let usuario = userServices.usuarioPk(req) 
         let rol= userServices.rol()        
         res.render('./users/user-edit', {usuario, rol, errors: errors.mapped(), oldData : req.body});
      };
   },
   //Eliminar usuario
   borrar: async (req, res) => {
      await userServices.eliminarUsuario(req, res);
      res.redirect('/');
   },
   //Recuperar usuario
   recuperarUsuario: (req, res) => {
      res.render('./users/recuperar');
   },
   UsuarioRecuperado: async (req, res) => {
      await userServices.recuperarUsuario(req) ? res.render('./users/login') : 
      res.render('./users/recuperar', {error:{credencial:{msg: 'Credenciales inválidas'}}});
   },
   //Login
   login: (req , res) => {
        res.render ('./users/login')
   },
   procesoLogin: async (req, res) => {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
         await userServices.login(req, res) ?  res.redirect('/user/perfil') : 
         res.render('./users/login', { error: {credencial: {msg: 'Credenciales inválidas'}}});
      } else {
         res.render('./users/login', { errors: errors.mapped(), oldData: req.body });
      };
   },
   //Perfil
   perfil: async (req, res) => {
      let user = await userServices.usuarioPefil(req, res);
      let pedidos = await userServices.comprasUsuario(req, res);
      res.render('./users/perfil', {user, pedidos});
   },
   pedidos: async(req, res) => {
      let pedidos = await userServices.pedidosUsuario(req);
      res.render('./users/pedidos', {pedidos});
   },
   logout: (req, res) => {
      req.session.destroy();
      res.clearCookie('recordame');
      res.redirect('/');
   }
};
module.exports = userController;