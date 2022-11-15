const fs = require('fs');
const path = require('path');

function userLoggedMiddleware (req, res, next) {
    
    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        let usuarioALoguearse;
        for (let o of users) {
            if (req.cookies.recordame == o.email) {
                usuarioALoguearse = o;
                break;
            }
        };
        
        req.session.usuarioLogueado = usuarioALoguearse;
    };
    res.locals.userLogueado = false;
    if (req.session.usuarioLogueado){
        res.locals.userLogueado = true;
        res.locals.usuarioLogueadoVistas = req.session.usuarioLogueado;
    }
    next();

};

module.exports = userLoggedMiddleware;