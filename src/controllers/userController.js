//Importación fs + path
const path = require('path');
const fs = require('fs');

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
            'password' : req.body.password,
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
};


module.exports = userController;