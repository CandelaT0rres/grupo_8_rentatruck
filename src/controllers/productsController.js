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
         res.send(errors)
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
         let img = `${'camiones-'}${Date.now()}${path.extname(req.file.originalname)}`;
         await sharp(req.file.buffer).
         resize(500, 500, {fit:"contain" , background:'#fff'}).
         toFormat('jpeg').
         jpeg({quality: 50}).
         toFile(path.join(__dirname, '../../public/img/') + img);
         db.Vehiculo.update({
            id_marca: datos.marca,
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
         //Eliminación img
         let camionAborrar = productosData.find((cadaElemento) => cadaElemento.id == req.params.id);
         let imagenAborrar = path.join(__dirname, "../../public/img", camionAborrar.rutaImg) ;
         fs.existsSync(imagenAborrar) ? fs.unlinkSync(imagenAborrar) : null;
         //Sharp
         /*let img = `${'producto-'}${Date.now()}${path.extname(req.file.originalname)}`;
         await sharp(req.file.buffer).resize(500, 500, {fit:"contain" , background:'#fff'}).jpeg({quality: 50, chromaSubsampling: '4:4:4'})
         .toFile(path.join(__dirname, '../../public/img/') + img);*/
         
         //Cuando encuentro el producto voy actualizando
         let imgAntigua; 
         for (let o of productosData) {
            if (o.id == req.params.id) {
               imgAntigua = o.rutaImg;
               o.nombre = req.body.nombre;
               o.marca = req.body.marca;
               o.modelo = req.body.modelo;
               o.tipoC = req.body.tipoC;
               o.precioKm = parseInt(req.body.precioKm);
               o.rutaImg = img;
               o.origen = req.body.origen;
               o.recorrido = req.body.recorrido;
               break;
            }
         };
         fs.unlinkSync(path.join(__dirname, "../../public/img/") + imgAntigua);

         //Guardado físico
         fs.writeFileSync(productFilePath, JSON.stringify(productosData, null, 4), 'utf-8');

         res.redirect('/');
      } else {
         let camionEncontrado = productosData.find((cadaElemento)=> cadaElemento.id == req.params.id);
         camionEncontrado? res.render("./products/editar", {producto: camionEncontrado, errors:errors.mapped(), oldData:req.body}): null;
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
         //Eliminación img
         let camionAborrar = productosData.find((cadaElemento) => cadaElemento.id == req.params.id);
         let imagenAborrar = path.join(__dirname, "../../public/img", camionAborrar.rutaImg) ;
         fs.existsSync(imagenAborrar) ? fs.unlinkSync(imagenAborrar) : null;
         
         //Eliminación camión
         let productoTerminado = productosData.filter((cadaElemento)=> cadaElemento.id != req.params.id)
         //Guardado físico
         fs.writeFileSync(productFilePath, JSON.stringify(productoTerminado, null, 4), 'utf-8');

         res.redirect('/');  
      }   
    
}

module.exports = productsController;