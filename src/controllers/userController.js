//Importación fs + path + bcrypt + sharp + Express-Validator
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const {validationResult} = require('express-validator');

//Importación Modelo
const db = require('../database/models');


//Geneador ID
// function generadorId (){
//    let ultimoId
//    if (usuarios.length != 0) {
//       ultimoId = (usuarios[usuarios.length-1].id)+1;
//    } else {
//       ultimoId = 1;
//    };
//    return ultimoId;
// }

const userController = {
   
   pathImg: path.join(__dirname, '../../public/img/img-users/'),

   //Vista Form Registro 
   registro: (req , res) => {
      db.Rol.findAll()
         .then((rol) => {
            res.render ('./users/registro', {rol})
         })
         .catch((err) => {console.log('No existe rol' + err)})
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
      let usuarioEncontrado = usuarios.find((cadaElemento) =>  cadaElemento.id == req.params.id);
      usuarioEncontrado ? res.render('./users/user-edit', {usuario: usuarioEncontrado}) : res.send('No existe el usuario');
   },

   updateUsuario: async (req, res) => {

      let errors = validationResult(req);
      if(errors.isEmpty()){
         
         //Borro img unlinkSync() recibe como parametro el path completo del archivo
         let product = usuarios.find((cadaElemento) => cadaElemento.id == req.params.id);
         let imgToDelete = path.join(__dirname, '../../public/img/img-users/', product.img);
         fs.existsSync(imgToDelete) ? fs.unlinkSync(imgToDelete) : null;

         //Sharp
         let img = `${'user-'}${Date.now()}${path.extname(req.file.originalname)}`;
         await sharp(req.file.buffer).
            resize(300, 300 , {fit:'contain', background:'#fff'}).
            toFormat('jpeg').
            jpeg({quality: 50}).
            toFile(`${path.join(__dirname, '../../public/img/img-users/')}${img}`);

         for ( let cadaElemento of usuarios){
            if (cadaElemento.id == req.params.id) {
               cadaElemento.nombre = req.body.nombre;
               cadaElemento.apellido = req.body.apellido
               cadaElemento.direccion = req.body.direccion;
               cadaElemento.direccion2 = req.body.direccion2;
               cadaElemento.dni = parseInt(req.body.dni);
               cadaElemento.ciudad = req.body.ciudad;
               cadaElemento.provincia = req.body.provincia;
               cadaElemento.email = req.body.email;
               cadaElemento.codigopostal = parseInt(req.body.codigopostal);
               cadaElemento.pais = req.body.pais;
               cadaElemento.password = bcrypt.hashSync(req.body.password, 10);
               cadaElemento.img = img;
               break;
            }
         }
         fs.writeFileSync(pathUsuarios, JSON.stringify(usuarios, null, 4) , 'utf-8');
         res.redirect('/');

      }else{
         let usuarioEncontrado = usuarios.find((cadaElemento) => cadaElemento.id == req.params.id);
         usuarioEncontrado ? res.render('./users/user-edit', {usuario: usuarioEncontrado , errors: errors.mapped(), oldData : req.body}) : res.send('No existe el usuario');
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
      let datos = req.body;
      let usuarioALoguearse;
      let errors = validationResult(req);

      if (errors.isEmpty()) {
         for (let o of usuarios) {
            if (datos.email == o.email) {
               if (bcrypt.compareSync(datos.password, o.password)) {
                  usuarioALoguearse = o;
               }
            }
         };

         if (usuarioALoguearse == undefined) {
            res.render('./users/login', { error: {
               credencial: {
                  msg: 'Credenciales inválidas'
               }
            } });
         } else {
            req.session.usuarioLogueado = usuarioALoguearse;
   
         if (datos.recordame != undefined) {
            res.cookie('recordame', datos.email, { maxAge: ((((1000 * 60) * 60) * 24) * 30) })
         };
   
         res.redirect('/');
         };

      } else {
         res.render('./users/login', { errors: errors.mapped(), oldData: datos });
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