const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const Cardapio = require("../../model/Cardapio.js");

function getView(req, res) {
    let view = "";

    const header = renderer("admin/default/header", { page: "CARDÁPIOS" });
    const js = [ "component/user modal", "new queue" ];
    const css = [ "queue", "component/modal", "component/user modal" ];
    const content = renderer("admin/default/user modal") + renderer("admin/menu/new")

    view = baseRender("- Novo Cardápio", header, content, js, css);
    return view;
}

async function setView(req, res) {
    if (req.body.token !== "create") throw Error("A chave de acesso é inválida");

    const menu = new Cardapio(undefined, req.body.link);   

    if (!await menu.create()) throw Error("Ocorreu um erro ao cadastrar o cardápio");

    res.redirect(301, "/admin/menu/" + menu.id);
    return "";
}

module.exports = { getView, setView };