const productsController = {
    productos: (req , res) => {
       res.render ('productos')
    },

    carrito: (req , res) => {
        res.render ('carrito')
     },
};


module.exports = productsController;