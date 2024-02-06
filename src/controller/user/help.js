const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");

function getView(req, res) {
    const header = renderer("user/default/header", { page: "SUPORTE" });
    const js = [ "component/user modal" ];
    const css = [ "component/user modal", "help" ];
    const content = renderer("user/help/index", {
        email: process.env.EMAIL,
        link: process.env.TUTORIAL
    });

    return baseRender("- Ajuda", header, content, js, css);
}

module.exports = { getView };