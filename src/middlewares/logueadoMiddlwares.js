function logueadoMiddleware (req, res, next) {
    if (req.session.usuarioLogueado != undefined) {
        res.send('Ya estás logueado');
    } else {
        next();
    };
};

module.exports = logueadoMiddleware;