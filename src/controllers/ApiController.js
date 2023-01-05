const apiServices = require('../services/apiServices');

const controller = {
    vehiculosCantidad: async (req, res) => {
       let vehiculos = await apiServices.vehiculos.count()
       res.json(vehiculos);
    },
    vehiculosCategoria: async (req, res) => {
        let vehiculos = await apiServices.vehiculos.countByCategory()
        res.json(vehiculos);
    },
    vehiculos: async (req, res) => {
        let vehiculos = await apiServices.vehiculos.allVehiculos()
        res.json(vehiculos);
    },
    vehiculosByPk: async (req, res) => {
        let vehiculos = await apiServices.vehiculoByPk(req);
        res.json(vehiculos);
    },
    usuariosCantidad: async(req, res) => {
        let usuarios = await apiServices.usuarios.count();
        res.json(usuarios);
    },
    usuarios: async(req, res) => {
        let usuarios = await apiServices.usuarios.users();
        res.json(usuarios);
    },
    categorias: async (req, res) => {
        let categorias = await apiServices.categorias();
        res.json(categorias);
    },
    marca: async (req, res) => {
        let marca = await apiServices.marcas()
        res.json(marca);
    },

    checkout: async (req, res)  => {
       let ordenDeCompra = await db.Ordenes_compra.create({...req.body, id_usuario: req.session.usuarioLogueado.id});
       res.json({ok: true, status: 200, ordenesUsuarios: ordenDeCompra});
    }
};

module.exports = controller;