//Importación fs + path + bcrypt + sharp + Express-Validator
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const {validationResult} = require('express-validator');

//Importación Modelo
const db = require('../database/models');

const userController = {
   
   pathImg: path.join(__dirname, '../../public/img/img-users/'),

   //Vista Form Registro 
   registro: (req , res) => {
      db.Rol.findAll()
         .then((rol) => {
            res.render ('./users/registro', {rol})
         })
         .catch((err) => {console.log(`${'Rol no encontrado'}${err}`)})
    },
   
   //Creación de usuario
   nuevoUsuario: async (req, res) =>{
      let errors = validationResult(req);
      if(errors.isEmpty()){
 
         //Sharp
         let img = `${'user-'}${Date.now()}${path.extname(req.file.originalname)}`;
         await sharp(req.file.buffer)
            .resize(300, 300 , {fit:'contain', background:'#fff'})
            .toFormat('jpeg')
            .jpeg({quality: 50})
            .toFile(`${this.pathImg}${img}`);
            
            db.Usuario.create({
               'id_rol':  req.body.id_rol,
               'nombre' : req.body.nombre,
               'dni' : parseInt(req.body.dni),
               'telefono' : req.body.telefono,
               'apellido': req.body.apellido,
               'direccion' : req.body.direccion,
               'email' : req.body.email,
               'contra': bcrypt.hashSync(req.body.password, 10),
               'img' : img
            });
            res.redirect('/user/login');     
      }else{
         res.render('./users/registro', {errors: errors.mapped(), oldData: req.body});
      }
   },

   //Vista y edición de usuario
   editarUsuario: (req, res) => {
      db.Usuario.findByPk(req.params.id)
         .then((usuarioEncontrado) => {
            res.render('./users/user-edit', {usuario: usuarioEncontrado})
         })
         .catch((err) => {
            res.send(`${'No existe el usuario'}${err}`)
         })
   },

   updateUsuario: async (req, res) => {

      let errors = validationResult(req);
      if(errors.isEmpty()){
         
         //Borro img unlink() recibe como parametro el path completo del archivo
         db.Usuario.findByPk(req.params.id)
            then((usuarioEncontrado) => {
               fs.unlink(`${this.pathImg}${usuarioEncontrado.img}`)
            })
            .catch((err) => {
               console.log(`${err}${'imagen de usuario no encontrada'}`);
            });

         //Sharp
         let img = `${'user-'}${Date.now()}${path.extname(req.file.originalname)}`;
         await sharp(req.file.buffer).
            resize(300, 300 , {fit:'contain', background:'#fff'}).
            toFormat('jpeg').
            jpeg({quality: 50}).
            toFile(`${this.pathImg}${img}`);

         db.Usuario.update({
            'id_rol':  req.body.id_rol,
            'nombre' : req.body.nombre,
            'dni' : parseInt(req.body.dni),
            'telefono' : req.body.telefono,
            'apellido': req.body.apellido,
            'direccion' : req.body.direccion,
            'email' : req.body.email,
            'contra': bcrypt.hashSync(req.body.password, 10),
            'img' : img
         },{
            where: {id :req.params.id}
         })
            .then(() =>{
               res.redirect('/');
            })
            .catch((err) => {
               console.log(`${err}${'Error al actualizar usuario'}`);
            });
      }else{
         db.Usuario.findByPk(req.params.id)
            .then((usuarioEncontrado) => {
               es.render('./users/user-edit', {usuario: usuarioEncontrado , errors: errors.mapped(), oldData : req.body})
            })
            .catch((err) => {
               res.send(`${'No existe el usuario'}${err}` )
            });
      }
   },
   //Eliminar usuario

   borrar: (req, res) => {
      db.Usuario.findByPk(req.params.id)
         .then((usuarioEncontrado) => {
            fs.unlink(`${this.pathImg}${usuarioEncontrado.img}`)
         })
         .catch((err) => {
            console.log(`${err}${'imagen de usuario no encontrada'}`);
         });
      db.Usuario.destroy(
         {where: {id: req.params.id}})
         .then(() => {res.redirect('/')})
         .catch((err) => {console.log(`${err}${'Error al eliminar usuario'}`)});
   },

   //Vista Login
   login: (req , res) => {
        res.render ('./users/login')
   },
   
   procesoLogin: (req, res) => {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
      db.Usuario.findOne({where: {email: req.body.email}})
         .then((usuarioALoguearse) => {
            if (bcryp.compareSync(req.body.password, usuarioALoguearse.password)) {
               return req.session.usuarioLogueado = usuarioALoguearse;
            }
         })
         .then(() => {
            if (datos.recordame != undefined) {
               res.cookie('recordame', datos.email, { maxAge: ((((1000 * 60) * 60) * 24) * 30) })
            };
            res.redirect('profile');
         })
         .catch(() =>{
            res.render('./users/login', { error: {
               credencial: {
                  msg: 'Credenciales inválidas'
               }
            }});
         })

      } else {
         res.render('./users/login', { errors: errors.mapped(), oldData: req.body });
      }

   },
   //Perfil

   perfil: (req, res) => {
      res.render('./users/perfil', {user: req.session.usuarioLogueado});
   },

   logout: (req, res) => {
      req.session.destroy();
      res.clearCookie('recordame');
      res.redirect('/');
   }
};


module.exports = userController;