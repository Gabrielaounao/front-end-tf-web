const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");

function getView(req, res) {
    const header = renderer("admin/default/header", { page: "SUPORTE" });
    const js = [ "component/user modal" ];
    const css = [ "component/user modal", "help" ];
    const content = renderer("admin/default/user modal") + renderer("admin/help/index", {
        email: process.env.EMAIL,
        link: process.env.TUTORIAL
    });

    return baseRender("- Ajuda", header, content, js, css);
}

module.exports = { getView };