const db = require('../database/models');
function userLoggedMiddleware (req, res, next) {
    
    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        let usuarioALoguearse;
        db.Usuario.findByPk(req.cookies.recordame)
            .then(usuarioCookie => {
                usuarioALoguearse = usuarioCookie;
                req.session.usuarioLogueado = usuarioALoguearse;
                res.locals.userLogueado = true;
                res.locals.usuarioLogueadoVistas = usuarioALoguearse;
            })
    };
    res.locals.userLogueado = false;
    if (req.session.usuarioLogueado){
        res.locals.userLogueado = true;
        res.locals.usuarioLogueadoVistas = req.session.usuarioLogueado;
    }
    next();

};

module.exports = userLoggedMiddleware;