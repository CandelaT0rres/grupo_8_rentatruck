//Importación modelo + sharp + path + fs
const db = require('../database/models');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

//Todos los vehículos
async function vehiculos() {
    return await db.Vehiculo.findAll({
        include:[{association: 'marcas'}, {association: 'tipo_mercaderia'}, {association: 'tipo_mercaderia'}, {association: 'usuarios'}]
    });
};
//Vehículo por Pk
async function vehiculoPk(req) {
    return await db.Vehiculo.findByPk(req.params.id, {include: [{association: 'marcas'}, {association: 'tipo_mercaderia'},{association: 'usuarios'}]})
}
//Marcas
async function marcas() {
    return await db.Marca.findAll();
};
//Tipos de mercaderías
async function mercaderias() {
    return await db.Tipo_mercaderia.findAll();
};
//Nuevo vehículo
async function vehiculoNuevo(req) {
    let img = `${'camiones-'}${Date.now()}${path.extname(req.file.originalname)}`;
    await sharp(req.file.buffer)
    .resize(400, 400, {fit:"contain" , background:'#fff'}).
    toFormat('jpeg')
    .jpeg({quality: 50})
    .toFile(path.join(__dirname, '../../public/img/') + img);

    return await db.Vehiculo.create({
       modelo: req.body.modelo,
       patente: req.body.patente,
       km: req.body.km,
       fecha_creacion: Date.now(),
       precio_km: req.body.precio_km,
       ruta_img: img,
       id_marca: req.body.marcas,
       id_tipo_mercaderia: req.body.tipo_mercaderia,
       id_usuario: req.session.usuarioLogueado.id
    });
};
//Borrado de img
async function imagenABorrar(req) {
    let vehiculo = await vehiculoPk(req)
    let imagenAborrar = path.join(__dirname, '../../public/img/' + vehiculo.ruta_img);
    fs.existsSync(imagenAborrar) ? fs.unlinkSync(imagenAborrar) : null;
};
//Actualizar vehículo
async function vehiculoActualizado(req) {
    await imagenABorrar(req);
    let img = `${'camiones-'}${Date.now()}${path.extname(req.file.originalname)}`;
    await sharp(req.file.buffer).
    resize(400, 400, {fit:"contain" , background:'#fff'}).
    toFormat('jpeg').
    jpeg({quality: 50}).
    toFile(`${path.join(__dirname, '../../public/img/')}${img}`);

    return await db.Vehiculo.update({
       id_marca: req.body.marcas,
       modelo: req.body.modelo,
       patente: req.body.patente,
       id_tipo_mercaderia: req.body.tipo_mercaderia,
       km: req.body.km,
       precio_km: req.body.precio_km,
       ruta_img: img
    }, {
       where: {
          id: req.params.id
        }
    });
};
//Borrado de Vehículo
async function vehiculoEliminado(req){
    await imagenABorrar(req);
    return await db.Vehiculo.destroy({where: {id: req.params.id}});
}

module.exports = {vehiculos, marcas, mercaderias, vehiculoPk, vehiculoNuevo, vehiculoActualizado, vehiculoEliminado};