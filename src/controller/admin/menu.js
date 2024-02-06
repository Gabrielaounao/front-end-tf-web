const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const Cardapio = require("../../model/Cardapio.js");

async function getView(req, res) {
    let view = "";

    const header = renderer("admin/default/header", { page: "CARDÁPIOS" });
    const js = [ "component/user modal" ];
    const css = [ "manage queue", "component/modal", "component/user modal" ];
    
    const menus = await Cardapio.getAllCardapios();
    let lines = "";

    menus.forEach(element => {
        lines += renderer("admin/menus/line", {
            id: element.id,
            link: element.link
        });
    });

    const content = renderer("admin/default/user modal") + renderer("admin/menus/index", {
        items: lines
    })

    view = baseRender("- Cardápios", header, content, js, css);
    return view;
}

module.exports = { getView };