//Importación Servicios + Express-validator
const productServices = require('../services/productServices');
const { validationResult } = require('express-validator');
const productsController = {

   //Muestro vista productos
   productos: async (req , res) => {
      let productos = await productServices.vehiculos();
      res.render ('./products/productos', {productos});   
   },
    //Muestro vista Carrito
   carrito: async (req , res) => {
      let productos = await productServices.vehiculos();
      let totalProductos = productos.forEach((vehiculo) => {0 + parseInt(vehiculo.precio_Km);})
      res.render ('./products/carrito', {productos, totalProductos})
   },
     //Muestro form nuevo producto
   cargar: async (req, res) => {
      let marcas = await productServices.marcas();
      let tipo_mercaderia = await productServices.mercaderias();
      res.render('./products/cargar', {marcas, tipo_mercaderia});
   },
     //Guardado producto
     guardar: async(req, res) =>{
      let errors = validationResult(req);
      if (errors.isEmpty()) {
         await productServices.vehiculoNuevo(req)
         res.redirect('/products/productos')
      } else {
         let marcas = await productServices.marcas();
         let tipo_mercaderia = await productServices.mercaderias();
         res.render('./products/cargar', {marcas, tipo_mercaderia, errors: errors.mapped()});
      }
   },
   //Muestro form editar producto
   editar: async (req, res) => {
      let producto = await productServices.vehiculoPk(req)
      let marcas = await productServices.marcas();
      let tipo_mercaderia = await productServices.mercaderias()
      res.render('./products/editar', {producto, marcas, tipo_mercaderia})
   },
     //Edición producto
   actualizar: async(req, res) => {
      let errors = validationResult(req);
      if (errors.isEmpty()){
         await productServices.vehiculoActualizado(req)
         res.redirect('/products/productos');
      } else {
         let producto = await productServices.vehiculoPk(req);
         let marcas = await productServices.marcas();
         let tipo_mercaderia = await productServices.mercaderias();
         res.render('./products/editar', {producto, marcas, tipo_mercaderia, errors: errors.mapped(), oldData: req.body})
      }
   },
   //Vista individual
   detalle: async (req, res) => {
      let camion = await productServices.vehiculoPk(req);
      res.render('products/detalle', {camion})
   },
   //Borrado producto
   borrar: async (req, res) => {
      await productServices.vehiculoEliminado(req)
      res.redirect('/');
   }    
};
module.exports = productsController;