const productosData = require('../data/products');

const productsController = {
    productos: (req , res) => {
       res.render ('productos', {productos: productosData});
    },

    carrito: (req , res) => {
        res.render ('carrito', {productos: productosData})
     },
};


module.exports = productsController;