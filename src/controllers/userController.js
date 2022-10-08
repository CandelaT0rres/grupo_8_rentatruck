//Importación fs + path + bcrypt
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

//Importación express-validator
const {validationResult} = require('express-validator');

//Usuarios
let pathUsuarios = path.join(__dirname, '../data/users.json');
let usuarios = JSON.parse(fs.readFileSync(pathUsuarios, 'utf-8'));

const userController = {
   //Vista Form Registro 
   registro: (req , res) => {
       res.render ('./users/registro')
    },
   
   //Creación de usuario
   nuevoUsuario: (req, res) =>{
      let errors = validationResult(req);
      if(errors.isEmpty()){
         let usuarioNuevo = {
            'nombre' : req.body.nombre,
            'direccion' : req.body.direccion,
            'apellido': req.body.apellido,
            'direccion2' : req.body.direccion2,
            'dni' : req.body.dni,
            'ciudad': req.body.ciudad,
            'provincia' : req.body.provincia,
            'email' : req.body.email,
            'codigopostal' : req.body.codigopostal,
            'pais' : req.body.pais,
            'password' : bcrypt.hashSync(req.body.password, 10),
            'img' : req.file.filename
         }
         usuarios.push(usuarioNuevo);
         fs.writeFileSync(pathUsuarios, JSON.stringify(usuarios, null , 4) , 'utf-8');
         res.redirect('/users/login');
         
      }else{
         res.render('./users/registro', {errors: errors.mapped(), oldData: req.body});
      }
   },
   //Vista Form Login
    login: (req , res) => {
        res.render ('./users/login')
     },
     procesoLogin: (req, res) => {
      let datos = req.body;
      let usuarioALoguearse;

      /*usuarioALoguearse = usuarios.find((cadaUsuario) => {
         cadaUsuario.email == datos.email
      });*/

      for (let o of usuarios) {
         if (datos.email == o.email) {
            if (bcrypt.compareSync(datos.password, o.password)) {
               usuarioALoguearse = o;
            }
         }
      };

      req.session.usuarioLogueado = usuarioALoguearse;

      if (datos.recordame != undefined) {
         res.cookie('recordame', datos.email, { maxAge: (((1000 * 60) * 60) * 24) })
      };

      res.redirect('/');

     },
     logout: (req, res) => {
      req.session.destroy();
      res.clearCookie('recordame');
      res.redirect('/');
     }
};


module.exports = userController;