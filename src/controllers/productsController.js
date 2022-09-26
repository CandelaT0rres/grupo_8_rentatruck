const productosData = require('../data/products');

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
         id: idNuevo,
         nombre: req.body.nombre,
         marca: req.body.marca,
         modelo: req.body.modelo,
         tipoC: req.body.tipoC,
         precioKm: parseInt(req.body.precioKm),
         rutaImg: 'camion1.jpg',
         origen: req.body.origen,
         recorrido: req.body.recorrido
         }
      productosData.push(camionNuevo);
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

     }
};


module.exports = productsController;