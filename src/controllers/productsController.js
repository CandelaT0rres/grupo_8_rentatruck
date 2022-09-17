const productosData = require('../data/products');

const productsController = {
    productos: (req , res) => {
       res.render ('./products/productos', {productos: productosData});
    },

    carrito: (req , res) => {
        res.render ('./products/carrito', {productos: productosData})
     },
     cargar: (req, res) => {
      res.render('./products/cargar')
     },
     editar: (req, res) => {
      res.render('./products/editar')
     }
};


module.exports = productsController;