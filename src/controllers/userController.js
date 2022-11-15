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
            .toFile(`${ path.join(__dirname, '../../public/img/img-users/')}${img}`);
            
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
      let usuario= db.Usuario.findByPk(req.params.id);
      let rol= db.Rol.findAll();
      Promise.all([
         usuario, rol
      ])
         .then(([usuario,rol]) => {
            res.render('./users/user-edit', {usuario: usuario, rol: rol});
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
            .then((usuarioEncontrado) => {
            let imagenABorrar = path.join(__dirname, '../../public/img/img-users/') + usuarioEncontrado.img;
            fs.existsSync(imagenABorrar)? fs.unlinkSync(imagenABorrar): null;
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
            toFile(`${path.join(__dirname, '../../public/img/img-users/')}${img}`);

         db.Usuario.update({
               'nombre' : req.body.nombre,
               'dni' : parseInt(req.body.dni),
               'telefono' : req.body.telefono,
               'apellido': req.body.apellido,
               'direccion' : req.body.direccion,
               'email' : req.body.email,
               'contra': bcrypt.hashSync(req.body.password, 10),
               'id_rol': req.body.id_rol,
               'img' : img
         },{
            where: {id:req.params.id}
         })
            .then(() =>{
               res.redirect('/user/perfil');
            })
            .catch((err) => {
               console.log(`${err}${'Error al actualizar usuario'}`);
            });
      }else{
         let usuario= db.Usuario.findByPk(req.params.id);
         let rol= db.Rol.findAll();
         Promise.all([
            usuario, rol
         ])
            .then(([usuario,rol]) => {
               res.render('./users/user-edit', {usuario: usuario, rol: rol, errors: errors.mapped(), oldData : req.body});
            })
            .catch((err) => {
               res.send(`${'No existe el usuario'}${err}`)
            });
      }
   },
   //Eliminar usuario

   borrar: (req, res) => {
      db.Usuario.findByPk(req.params.id)
         .then((usuarioEncontrado) => {
            let imagenABorrar=`${path.join(__dirname, '../../public/img/img-users/')}${usuarioEncontrado.img}`;
            fs.existsSync(imagenABorrar)? fs.unlinkSync(imagenABorrar): null;
         })
         .catch((err) => {
            console.log(`${err}${'imagen de usuario no encontrada'}`);
         });
         setTimeout(() => {
            db.Usuario.destroy(
               {where: {id: req.params.id}})
               .then(() => {
                  
                  req.session.destroy();
                  res.clearCookie('recordame');
                  res.redirect('/')})

               .catch((err) => {console.log(`${err}${'Error al eliminar usuario'}`)});
            
            
         }, '3000')
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
            if (bcrypt.compareSync(req.body.password, usuarioALoguearse.contra)) {
               req.session.usuarioLogueado = usuarioALoguearse;
               
               if (req.body.recordame) {
                  res.cookie('recordame', usuarioALoguearse.email, { maxAge: ((((1000 * 60) * 60) * 24) * 30) })
               };
            }else {
               res.render('./users/login', { error: {
                  credencial: {
                     msg: 'Credenciales inválidas'
                  }
               }});
            }
         })
         .then((usuarioALoguearse2) => {
            if (req.body.recordame != undefined) {
               res.cookie('recordame', usuarioALoguearse2.email, { maxAge: ((((1000 * 60) * 60) * 24) * 30) })
            };
            res.redirect('/user/perfil');
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
      db.Usuario.findOne({
         where: {
            email: req.session.usuarioLogueado.email
         }
      })
      .then ((user) => {
       res.render('./users/perfil', {user});
      })
      
   },

   logout: (req, res) => {
      req.session.destroy();
      res.clearCookie('recordame');
      res.redirect('/');
   }
};


module.exports = userController;