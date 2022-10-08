//Importación FileSystem + Path
const fs = require('fs');
const path = require('path');

// Requerimos express-validator
const { validationResult } = require('express-validator');

const productFilePath = path.join(__dirname, '../data/products.json');
const productosData = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));

const productsController = {

   //Muestro vista productos
    productos: (req , res) => {
       res.render ('./products/productos', {productos: productosData});
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
      res.render('./products/cargar')
     },

     //Guardado producto
     guardar: (req, res) =>{

      let errors = validationResult(req);

      if (errors.isEmpty()) {
         let idNuevo = (productosData[productosData.length - 1].id) + 1;
   
         let camionNuevo = {
            "id": idNuevo,
            "nombre": req.body.nombre,
            "marca": req.body.marca,
            "modelo": req.body.modelo,
            "tipoC": req.body.tipoC,
            "precioKm": parseInt(req.body.precioKm),
            "rutaImg": req.file.filename,
            "origen": req.body.origen,
            "recorrido": req.body.recorrido
         };
         
         //Guardado lógico
         productosData.push(camionNuevo);

         //Guardado físico
         fs.writeFileSync(productFilePath, JSON.stringify(productosData, null, 4), 'utf-8');
            
         res.redirect('/products/productos');
      } else {
         res.render('./products/cargar', {errors: errors.mapped(), oldData: req.body});
      }

   
     },
     
     //Muestro form editar producto
     editar: (req, res) => {
      let camionBuscado = null;
      for(cadaElemento of productosData){
         if (cadaElemento.id == req.params.id)
         camionBuscado = cadaElemento;
         
      }
      if (camionBuscado != null) {
         res.render('./products/editar', {producto: camionBuscado});
      }else{
         res.send('Error camión no encontrado');
      };
     },


     //Edición producto
     actualizar: (req, res) => {
      let errors = validationResult(req);
      if (errors.isEmpty){
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
               o.rutaImg = req.file.filename;
               o.origen = req.body.origen;
               o.recorrido = req.body.recorrido;
               break;
            }
         };
         fs.unlinkSync(path.join(__dirname, "../../public/img/")+imgAntigua)

         //Guardado físico
         fs.writeFileSync(productFilePath, JSON.stringify(productosData, null, 4), 'utf-8');

         res.redirect('/');
      } else {
         let camionEncontrado= productosData.find((cadaElemento)=> cadaElemento.id==req.params.id);
         camionEncontrado? res.render("./products/editar", {camion: camionEncontrado, errors:errors.mapped(), oldData:req.body}): null;
      }
      
     },
     //Vista individual
     detalle: (req, res) => {
      let elementoCamion = null;
      let detalleId = req.params.id 
      for(cadaElemento of productosData){
         if (cadaElemento.id == detalleId){
            elementoCamion = cadaElemento
            break
         }
       }
       if(elementoCamion != null){
         res.render("products/detalle", {camion: elementoCamion})
       } else{
         res.send("flashaste bro")
       }
     },
     //Borrado producto
     borrar: (req, res) => {
      let camionAborrar = productosData.find((cadaElemento) => cadaElemento.id == req.params.id);
      let imagenAborrar = path.join(__dirname, "../../public/img", camionAborrar.rutaImg) ;
      if(fs.existsSync(imagenAborrar)){
         fs.unlinkSync(imagenAborrar)

      }         
      let productoTerminado = productosData.filter((cadaElemento)=> cadaElemento.id != req.params.id)
      //Guardado físico
      fs.writeFileSync(productFilePath, JSON.stringify(productoTerminado, null, 4), 'utf-8');

      res.redirect('/');  
      }

      
     
}


module.exports = productsController;