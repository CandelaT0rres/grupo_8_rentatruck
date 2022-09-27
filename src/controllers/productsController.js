const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, '../data/products.json');
const productosData = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));

const productsController = {
    productos: (req , res) => {
       res.render ('./products/productos', {productos: productosData});
    },
    
    carrito: (req , res) => {
      var totalProductos = 0;
      for (d of productosData) {
         totalProductos = totalProductos + d.precioKm;
      };
        res.render ('./products/carrito', {productos: productosData, total: totalProductos})
     },
     
     cargar: (req, res) => {
      res.render('./products/cargar')
     },

     guardar: (req, res) =>{

      let idNuevo = (productosData[productosData.length - 1].id) + 1;

      let camionNuevo = {
         "id": idNuevo,
         "nombre": req.body.nombre,
         "marca": req.body.marca,
         "modelo": req.body.modelo,
         "tipoC": req.body.tipoC,
         "precioKm": parseInt(req.body.precioKm),
         "rutaImg": 'camion1.jpg',
         "origen": req.body.origen,
         "recorrido": req.body.recorrido
         }
      productosData.push(camionNuevo);

      fs.writeFileSync(productFilePath, JSON.stringify(productosData, null, 4), 'utf-8');

      res.redirect('/');
     },

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

     actualizar: (req, res) => {
      for (let o of productosData) {
         if (o.id == req.params.id) {
            o.nombre = req.body.nombre;
            o.marca = req.body.marca;
            o.modelo = req.body.modelo;
            o.tipoC = req.body.tipoC;
            o.precioKm = parseInt(req.body.precioKm);
            o.rutaImg = req.body.rutaImg;
            o.origen = req.body.origen;
            o.recorrido = req.body.recorrido;
            break;
         }
      };

      fs.writeFileSync(productFilePath, JSON.stringify(productosData, null, 4), 'utf-8');

      res.redirect('/');
     }
};


module.exports = productsController;