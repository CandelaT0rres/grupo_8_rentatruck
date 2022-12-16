const db = require('../database/models');

const controller = {
    productsList: (req, res) => {
        db.Vehiculo.findByPk(req.params.id, {include: [{association: 'tipo_mercaderia'}, {association: 'marcas'}]})
            .then(respuesta => res.json(respuesta));
    },

    checkout: async (req, res)  => {
       let ordenDeCompra = await db.Ordenes_compra.create({...req.body, id_usuario: req.session.usuarioLogueado.id}, {include: db.Ordenes_compra.Vehiculo} );
       res.json({ok: true, status: 200, ordenesUsuarios: ordenDeCompra});
    }
};

module.exports = controller;