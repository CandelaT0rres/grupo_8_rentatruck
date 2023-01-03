const db = require('../database/models');

const controller = {
    products: (req, res) => {
        db.Vehiculo.findAll()
            .then(respuesta => res.json(respuesta));
    },
    productsList: (req, res) => {
        db.Vehiculo.findByPk(req.params.id, {include: [{association: 'tipo_mercaderia'}, {association: 'marcas'}]})
            .then(respuesta => res.json(respuesta));
    },

    checkout: async (req, res)  => {
       let ordenDeCompra = await db.Ordenes_compra.create({...req.body, id_usuario: req.session.usuarioLogueado.id});
       res.json({ok: true, status: 200, ordenesUsuarios: ordenDeCompra});
    },
    users: (req, res) => {
        db.Usuario.findAll()
            .then(respuesta => res.json(respuesta))
    }
};

module.exports = controller;