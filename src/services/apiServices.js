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
    countByCategory: async() => {
        let VehiculoCategoria = await db.Vehiculo.findAll({include: [{association: 'tipo_mercaderia'}]});
        let categorias = [[], [], [], [], [], []];
       
        for(x of VehiculoCategoria){
            if (x.tipo_mercaderia.id == 1) {
                categorias[0].push(x)
            }else if (x.tipo_mercaderia.id == 2){
                categorias[1].push(x)
            }else if (x.tipo_mercaderia.id == 3){
                categorias[2].push(x)
            }else if (x.tipo_mercaderia.id == 4){
                categorias[3].push(x)
            }else if (x.tipo_mercaderia.id == 5){
                categorias[4].push(x)
            }else{
                categorias[5].push(x)
            };
        };
        return categorias;
    },
    allVehiculos: async () => {
        return await db.Vehiculo.findAll();
    }
};

//Categorias
async function categorias() {
    return await db.Tipo_mercaderia.findAll();
};

//Marcas
async function marcas() {
    return await db.Marca.findAll();
}

//Producto por ID
async function vehiculoByPk(req) {
    return await db.Vehiculo.findByPk(req.params.id, {include: [{association: 'tipo_mercaderia'}, {association: 'marcas'}, {association: 'usuarios'}]});
}


module.exports = {usuarios, vehiculos, categorias, vehiculoByPk, marcas}