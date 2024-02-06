function withLogin(req, res, next) {
    if (req.session.user) next();
    else res.redirect(301, "/login");
}

function withoutLogin(req, res, next) {
    if (req.session.user) res.redirect(301, "/");
    else next();
}

module.exports = { withLogin, withoutLogin };