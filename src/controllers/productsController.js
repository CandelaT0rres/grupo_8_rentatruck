//Importación FileSystem + Path
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const db = require('../database/models');

// Importación express-validator
const { validationResult } = require('express-validator');
const { promiseImpl } = require('ejs');

const productsController = {

   //Muestro vista productos
    productos: (req , res) => {
      db.Vehiculo.findAll({
         include: [{association: 'marcas'}, {association: 'tipo_mercaderia'}, {association: 'tipo_mercaderia'}, {association: 'usuarios'}]
      })
         .then(productos => {
            res.render ('./products/productos', {productos});
         })
         .catch(err => {
            console.log(err);
         })
    },
    
    //Muestro vista Carrito
    carrito: (req , res) => {
      var totalProductos = 0;
      for (d of productosData) {
         totalProductos = totalProductos + d.precioKm;
      };
        res.render ('./products/carrito', {productos: productosData, total: totalProductos})
     },
     
     //Muestro form nuevo producto
     cargar: (req, res) => {
      let marcas = db.Marca.findAll();
      let tipo_mercaderia = db.Tipo_mercaderia.findAll();
         Promise.all([marcas, tipo_mercaderia])
            .then(([marcas, tipo_mercaderia]) => {
               res.render('./products/cargar', {marcas: marcas, tipo_mercaderia: tipo_mercaderia})
            })
            .catch(err => {
               console.log(err);
            })
     },

     //Guardado producto
     guardar: async(req, res) =>{

      let errors = validationResult(req);

      let datos = req.body;

      if (errors.isEmpty()) {

         let img = `${'camiones-'}${Date.now()}${path.extname(req.file.originalname)}`;
         await sharp(req.file.buffer).
         resize(500, 500, {fit:"contain" , background:'#fff'}).
         toFormat('jpeg').
         jpeg({quality: 50}).
         toFile(path.join(__dirname, '../../public/img/') + img);
         db.Vehiculo.create({
            modelo: datos.modelo,
            patente: datos.patente,
            km: datos.km,
            fecha_creacion: Date.now(),
            precio_km: datos.precio_km,
            ruta_img: img,
            id_marca: datos.marcas,
            id_tipo_mercaderia: datos.tipo_mercaderia,
            id_usuario: req.session.usuarioLogueado.id
         })
            .then(() => {
               res.redirect('/products/productos')
            })
            .catch(err => {
               console.log(err);
            })

      } else {
         let marcas = db.Marca.findAll();
         let tipo_mercaderia = db.Tipo_mercaderia.findAll();
         Promise.all([marcas, tipo_mercaderia])
            .then(([marcas, tipo_mercaderia]) => {
               res.render('./products/cargar', {marcas: marcas, tipo_mercaderia: tipo_mercaderia, errors: errors.mapped()})
            })
            .catch(err => {
               console.log(err);
            })
      }

   
     },
     
     //Muestro form editar producto
     editar: (req, res) => {
         let marcas = db.Marca.findAll()
         let tipo_mercaderia = db.Tipo_mercaderia.findAll()
         let producto = db.Vehiculo.findByPk(req.params.id, {
            include: [{association: 'marcas'}, {association: 'tipo_mercaderia'}]
         })
         Promise.all([producto, marcas, tipo_mercaderia])
            .then(([producto, marcas, tipo_mercaderia]) => {
               res.render('./products/editar', {producto, marcas, tipo_mercaderia})
            })
     },

     //Edición producto
     actualizar: async(req, res) => {
      let datos = req.body;
      let errors = validationResult(req);
      if (errors.isEmpty()){

         db.Vehiculo.findByPk(req.params.id)
            .then(camionEncontrado => {
               let imagenAborrar = path.join(__dirname, '../../public/img/' + camionEncontrado.ruta_img) ;
               fs.existsSync(imagenAborrar) ? fs.unlinkSync(imagenAborrar) : null;
            })
            .catch(err => {
               console.log(err);
            })

         let img = `${'camiones-'}${Date.now()}${path.extname(req.file.originalname)}`;
         await sharp(req.file.buffer).
         resize(500, 500, {fit:"contain" , background:'#fff'}).
         toFormat('jpeg').
         jpeg({quality: 50}).
         toFile(path.join(__dirname, '../../public/img/') + img);
         db.Vehiculo.update({
            id_marca: datos.marcas,
            modelo: datos.modelo,
            patente: datos.patente,
            id_tipo_mercaderia: datos.tipo_mercaderia,
            km: datos.km,
            precio_km: datos.precio_km,
            ruta_img: img
         }, {
            where: {
               id: req.params.id
            }
         })
            .then(() => {
               res.redirect('/');
            })

      } else {

         console.log('ENTRE A ERRORES');

         let marcas = db.Marca.findAll()
         let tipo_mercaderia = db.Tipo_mercaderia.findAll()
         let producto = db.Vehiculo.findByPk(req.params.id, {
            include: [{association: 'marcas'}, {association: 'tipo_mercaderia'}]
         })
         Promise.all([producto, marcas, tipo_mercaderia])
            .then(([producto, marcas, tipo_mercaderia]) => {
               res.render('./products/editar', {producto, marcas, tipo_mercaderia, errors: errors.mapped(), oldData: req.body})
            })
      }
      
     },
     //Vista individual
     detalle: (req, res) => {
         db.Vehiculo.findByPk(req.params.id, {
            include: [{association: 'marcas'}, {association: 'tipo_mercaderia'}]
         })
            .then(camion => {
               res.render('products/detalle', {camion})
            })
            .catch(err => {
               res.send(err)
            })
     },
     //Borrado producto
     borrar: (req, res) => {
      db.Vehiculo.findByPk(req.params.id)
         .then((vehiculoEncontrado) => {
            let imagenABorrar=`${ path.join(__dirname, '../../public/img/')}${vehiculoEncontrado.ruta_img}`;
            fs.existsSync(imagenABorrar)? fs.unlinkSync(imagenABorrar): null;
         })
         .catch((err) => {
            console.log(`${err}${'imagen de vehiculo no encontrada'}`);
         });
         setTimeout(() => {
            db.Vehiculo.destroy(
               {where: {id: req.params.id}})
               .then(() => {res.redirect('/')})
               .catch((err) => {console.log(`${err}${'Error al eliminar vehiculo'}`)});
         }, '500')
      }   
    
}

module.exports = productsController;