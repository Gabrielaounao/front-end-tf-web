const renderer = require("./../tools/renderer.js");

const getBasePage = (title, header, content, script = [], css = []) => {
    let view = "";

    view = renderer("default/base page", {
        title: title,
        header: header,
        main: content,
        script: getScript(script),
        css: getCss(css)
    });

    return view;
}

function getScript(items) {
    let res = "";

    items.forEach(element => {
        res += renderer("default/script", { link: element });
    });

    return res;
}

function getCss(items) {
    let res = "";

    items.forEach(element => {
        res += renderer("default/css", { link: element });
    });

    res += renderer("default/css", { link: "global" });

    return res;
}

module.exports = getBasePage;