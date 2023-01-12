const db = require('../database/models');

//Todos los usuarios
let usuarios = {
    count: async() => {
        let usuarios = await db.Usuario.findAll();
        let total = usuarios.length;
        return total
    },
    users: async() => {
        let usuarios = await db.Usuario.findAll();
        delete usuarios.contra;
        return usuarios;
    }
};
//Vehículos 
let vehiculos = {
    count: async () => {
        let cantidad = await db.Vehiculo.findAll();
        return cantidad.length;
    },
    allVehiculos: async () => {
        return await db.Vehiculo.findAll({include: [{association: 'marcas'}, {association: 'tipo_mercaderia'}]});
    },
    ordenesCompra: async (idVehiculo, modelo, precio, cantidad, total, idUsuario) => {
        let orden = await db.Ordenes_compra.create({id_vehiculo: idVehiculo, modelo: modelo, precio: parseInt(precio), cantidad: parseInt(cantidad), total: parseInt(total), id_usuario: idUsuario});
        return orden;
    }
};

//Categorias
async function categorias() {
    return await db.Tipo_mercaderia.findAll();
};
async function categoriasVehiculos() {
    return await db.Tipo_mercaderia.findAll({include: [{association: 'vehiculo'}]});
}

//Marcas
async function marcas() {
    return await db.Marca.findAll();
}

async function marcasCantidad() {
    let marcas = await db.Marca.findAll();
    return marcas.length;
};

//Producto por ID
async function vehiculoByPk(req) {
    return await db.Vehiculo.findByPk(req.params.id, {include: [{association: 'tipo_mercaderia'}, {association: 'marcas'}, {association: 'usuarios'}]});
}


module.exports = {usuarios, vehiculos, categorias, vehiculoByPk, marcas, categoriasVehiculos, marcasCantidad}