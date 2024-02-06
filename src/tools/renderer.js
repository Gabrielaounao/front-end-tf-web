const fs = require('fs');
const path = require('path');

function bindParams(view, params) {
    let key = Object.keys(params);
    key.push("URL");

    let value = Object.values(params);
    value.push(process.env.URL);

    key = key.map(element => { return "--{" + element + "}--" });

    for (let i = 0; i < key.length; i++) {
        let regex = new RegExp(key[i], 'g');
        view = view.replace(regex, value[i]);
    }

    return view;
}

const render = (viewPath, params = {}) => {
    try {
        const str = fs.readFileSync(path.join(__dirname, "/../view/" + viewPath + ".html")).toString();
        return bindParams(str, params);
    } catch {
        return "";
    }
}

module.exports = render;