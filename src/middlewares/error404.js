let error404 = (req, res, next) => {
    res.status(404).render('not-found');
}

module.exports = error404;

