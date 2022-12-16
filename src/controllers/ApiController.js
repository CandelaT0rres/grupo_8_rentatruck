const db = require('../database/models');

const controller = {
    productsList: (req, res) => {
        db.Producto.findAll()
            .then(res => res.json())
    }
};

module.exports = controller;