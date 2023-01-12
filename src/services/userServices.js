//Importación fs + path + bcrypt + sharp + Express-Validator + modelos
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const db = require('../database/models');

//Rol de usuario
async function rol() {
    return await db.Rol.findAll();
};
//Nuevo usuario
async function nuevoUsuario(req) {
    let usuario = await db.Usuario.findOne({where: {email: req.body.email}});
    
    if (!usuario) {
        let img = `${'user-'}${Date.now()}${path.extname(req.file.originalname)}`;
        await sharp(req.file.buffer)
           .resize(300, 300 , {fit:'contain', background:'#fff'})
           .toFormat('jpeg')
           .jpeg({quality: 50})
           .toFile(`${ path.join(__dirname, '../../public/img/img-users/')}${img}`);
           
        return await db.Usuario.create({
            'id_rol':  req.body.id_rol,
            'nombre' : req.body.nombre,
            'dni' : parseInt(req.body.dni),
            'telefono' : req.body.telefono,
            'apellido': req.body.apellido,
            'direccion' : req.body.direccion,
            'email' : req.body.email,
            'contra': bcrypt.hashSync(req.body.password, 10),
            'img' : img
        });
    };
};
//Usuario por ID
async function usuarioPk(req) {
    return await db.Usuario.findByPk(req.params.id, {include: [{association: 'usuarios'}]});
};
//Borrar Avatar
async function borrarAvatar(req) {
    let usuario = await usuarioPk(req);
    let avatarABorrar = `${path.join(__dirname, '../../public/img/img-users/')}${usuario.img}`
    fs.existsSync(avatarABorrar) ? fs.unlinkSync(avatarABorrar) : null;
};
//Actulizar usuario
async function actualizarUsuario(req) {
    await borrarAvatar(req)
    let img = `${'user-'}${Date.now()}${path.extname(req.file.originalname)}`;
         await sharp(req.file.buffer).
            resize(300, 300 , {fit:'contain', background:'#fff'}).
            toFormat('jpeg').
            jpeg({quality: 50}).
            toFile(`${path.join(__dirname, '../../public/img/img-users/')}${img}`);

    return await db.Usuario.update({
        'nombre' : req.body.nombre,
        'dni' : parseInt(req.body.dni),
        'telefono' : req.body.telefono,
        'apellido': req.body.apellido,
        'direccion' : req.body.direccion,
        'email' : req.body.email,
        'contra': bcrypt.hashSync(req.body.password, 10),
        'id_rol': req.body.id_rol,
        'img' : img
    },{
            where: {id:req.params.id}
    })
};
//Eliminar usuario (soft Delete)
async function eliminarUsuario(req, res) {
    await db.Usuario.destroy({where:{id: req.params.id}});
    req.session.destroy();
    res.clearCookie('recordame');
};

//Recuperar usuario
async function recuperarUsuario(req) {
    //Primero busco el usuario por email,(debo aclarar paranoid: false para que me busque todo)
    let usuario = await db.Usuario.findOne({where: {email: req.body.email}, paranoid: false});
    //Si existe el usuario y su contraseña es válida, hago el restore
    if (usuario && bcrypt.compareSync(req.body.password, usuario.contra)) {
        db.Usuario.restore({where: {id: usuario.id}})
        return usuario;
    };
};
//Login 
async function login(req, res) {
    let usuario = await db.Usuario.findOne({where: {email: req.body.email}});
    if (usuario && bcrypt.compareSync(req.body.password, usuario.contra)) {
        if (req.body.recordame) {
            res.cookie('recordame', usuario.email, { maxAge: ((((1000 * 60) * 60) * 24) * 30) })
        }
        return req.session.usuarioLogueado = usuario;
    };
};
//Perfil de usuario
async function usuarioPefil(req) {
    return await db.Usuario.findOne({where: {email: req.session.usuarioLogueado.email}});
};
//Compras de usuario
async function comprasUsuario(req) {
    return await db.Ordenes_compra.findAll({where:{id_usuario: req.session.usuarioLogueado.id }});
};
//Pedidos de usuario
async function pedidosUsuario(req) {
    return await db.Ordenes_compra.findAll({where:{ id : req.params.id}})
}
module.exports = {rol, nuevoUsuario, usuarioPk, actualizarUsuario, eliminarUsuario, recuperarUsuario, login, usuarioPefil, comprasUsuario, pedidosUsuario};