const renderer = require("./../tools/renderer.js");
const baseRender = require("./base.js");

const getError500 = (message) => {
    return baseRender("- ERRO", "", renderer("error/500", { message: message }));
}

const getError405 = (message) => {
    return baseRender("- ERRO", "", renderer("error/405", { message: message }));
}

module.exports = { getError500, getError405 };