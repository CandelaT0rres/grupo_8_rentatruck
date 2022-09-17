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
     editar: (req, res) => {
      res.render('./products/editar')
     }
};


module.exports = productsController;