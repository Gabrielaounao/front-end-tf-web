const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const Usuario = require("../../model/Usuario.js");
const session = require("./../../tools/session.js");

function getView(req, res, status = null) {
    let view = "";

    const header = renderer("public/default/header");
    const js = [ "component/menu", "signup" ];
    const css = [ "signup", "component/menu", "component/menu" , "component/modal"];

    const content = renderer("public/signup/index", {
        status: status === null ? "" : renderer("default/status", { type: "error", message: status })
    });

    view = baseRender("- Criar Conta", header, content, js, css);

    return view;
}

async function setView(req, res) {
    const obj = req.body;
    const user = new Usuario(undefined, obj.nome, obj.email, obj.senha, Usuario.ENUM_vinculo_escolar[Number(obj.vinculo)], "client");

    if (await user.create()) {
        session.createSession(req, user);
        res.redirect(301, "/");
        return;
    }

    throw Error("Ocorreu um erro ao tentar cadastrar o usuário");
}

module.exports = { getView, setView };