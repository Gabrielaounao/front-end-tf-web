const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const Cardapio = require("../../model/Cardapio.js");

async function getView(req, res) {
    let view = "";

    const header = renderer("admin/default/header", { page: "CARDÁPIOS" });
    const js = [ "component/user modal" ];
    const css = [ "queue", "component/modal", "component/user modal" ];

    const cardapio = await Cardapio.getCardapioById(req.params.id);
    if (cardapio === null) throw Error("Cardápio não encontrado");

    const content = renderer("admin/default/user modal") + renderer("admin/menu/index", { link: cardapio.link });

    view = baseRender("- Cardápio", header, content, js, css);
    return view;
}

async function setView(req, res) {
    if (req.body.token !== "update") throw Error("A chave de acesso é inválida");

    const menu = await Cardapio.getCardapioById(req.params.id);
    if (menu === null) throw Error("Cardápio não encontrado");

    menu.link = req.body.link;

    if (!await menu.update()) throw Error("Ocorreu um erro ao atualizar o cardápio");

    res.redirect(301, "/admin/menu/" + menu.id);
    return "";
}

module.exports = { getView, setView };