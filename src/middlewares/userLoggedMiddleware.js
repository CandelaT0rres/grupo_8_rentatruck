const db = require('../database/models');

function userLoggedMiddleware (req, res, next) {
    
    if (req.cookies.recordame && req.session.usuarioLogueado == undefined) {
        db.Usuario.findOne({
            where: {email: req.cookies.recordame}
        })
           .then((usuarioALoguearse) => {
                req.session.usuarioLogueado = usuarioALoguearse;
            })
            .catch((err) => {
                console.log(`${err}${'Error en cookie o email'}`);
            })
       
    };
    res.locals.userLogueado = false;
    if (req.session.usuarioLogueado){
        db.Usuario.findOne({where: {email: req.session.usuarioLogueado.email}})
            .then((usuario) => {
                res.locals.usuarioLogueadoVistas = usuario;
            })
            res.locals.userLogueado = true;
    }
    next();

};

module.exports = userLoggedMiddleware;