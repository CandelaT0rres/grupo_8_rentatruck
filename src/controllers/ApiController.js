const db = require('../database/models');

const controller = {
    productsList: (req, res) => {
        db.Vehiculo.findByPk(req.params.id, {include: [{association: 'tipo_mercaderia'}, {association: 'marcas'}]})
            .then(respuesta => res.json(respuesta));
    }
};

module.exports = controller;