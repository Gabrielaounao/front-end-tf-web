function withAdmin (req, res, next) {
    if (req.session.user.tipo_usuario === undefined) next();
    else res.redirect(301, "/");
}

function withoutAdmin(req, res, next) {
    if (req.session.user.tipo_usuario === undefined) res.redirect(301, "/admin");
    else next();
}

module.exports = { withAdmin, withoutAdmin };