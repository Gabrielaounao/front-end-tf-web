const session = require("./../../tools/session.js");

async function getView(req, res) {
    session.deleteSession(req);
    res.redirect(301, "/login");
}

module.exports = getView;
