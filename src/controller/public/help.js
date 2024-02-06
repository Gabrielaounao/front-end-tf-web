const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");

function getView(req, res) {
    const header = renderer("public/default/header");
    const js = [ "component/menu" ];
    const css = [ "component/menu", "help" ];
    const content = renderer("public/help/index", {
        email: process.env.EMAIL,
        link: process.env.TUTORIAL
    });

    return baseRender("- Ajuda", header, content, js, css);
}

module.exports = getView;