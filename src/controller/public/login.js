const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const session = require("./../../tools/session.js");
const Usuario = require("./../../model/Usuario.js");
const Administrador = require("../../model/Administrador.js");

function getView(req, res, status = null) {
    let view = "";

    const header = renderer("public/default/header");
    const js = [ "component/menu" ];
    const css = [ "login", "component/menu" ];

    const content = renderer("public/login/index", {
        status: status === null ? "" : renderer("default/status", { type: "error", message: status })
    });

    view = baseRender("- Entrar", header, content, js, css);

    return view;
}

async function setView(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;

    const users = await Usuario.getAllUsers();

    let user = undefined;

    users.forEach(element => {
        if (element.email === email && element.senha === senha) {
            user = element;
            return;
        }
    });

    if (user !== undefined) {
        session.createSession(req, user);
        res.redirect(301, "/");
        return;
    }

    const admins = await Administrador.getAllAdministradores();
    let admin = undefined;

    admins.forEach(element => {
        if (element.email === email && element.senha === senha) {
            admin = element;
            return;
        }
    });

    if (admin !== undefined) {
        session.createSession(req, admin);
        res.redirect(301, "/admin");
        return;
    }

    throw Error("Usuário não encontrado");
}

module.exports = { getView, setView };