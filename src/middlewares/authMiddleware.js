let ruta = '/'
function authMiddleware (req, res, next) {
    if (req.session.usuarioLogueado) {
        next()
    } else {
        res.redirect(`${ruta}${'user/login'}`);
    }
};

module.exports = authMiddleware;