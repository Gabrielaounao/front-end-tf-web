const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const emailManager = require("./../../tools/emailManager.js");
const seedrandom = require("seedrandom");
const session = require("./../../tools/session.js");
const Usuario = require("./../../model/Usuario.js");

function getView(req, res, status = null) {
    let view = "";
    
    const header = renderer("public/default/header");
    const css = [ "component/menu", "recover-password" ];
    const js = [ "component/menu" ];
    const content = renderer("public/recover password/page1", { status: status === null ? "" : renderer("default/status", { type: "error", message: status })});

    view = baseRender("- Recuperar Senha", header, content, js, css);
    return view;
}

async function setView(req, res) {
    switch (req.body.token) {
        case "send-code":
            const users = await Usuario.getAllUsers();
            let is_valid = false;

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === req.body.email) is_valid = true;;
            }

            if (!is_valid) {
                return getView(req, res, "O email informado não está cadastrado no sistema");
            }

            const generator = seedrandom(process.env.SECRET + "-" + req.body.email + "-" + Math.floor(Date.now() / 1000));
            let start = 100000;
            let end = 999999;
            let code = Math.floor(generator() * (end - start + 1)) + start;

            req.session.code = {
                code: code, email: req.body.email
            };

            if (!await emailManager(req.body.email, code)) throw Error("Ocorreu um erro ao encaminhar o email");

            return baseRender("- Recuperar Senha", 
            renderer("public/default/header"), 
            renderer("public/recover password/page2", { status: "" }),
            [ "component/menu" ],
            [ "component/menu", "recover-password" ]);

        case "check-code":
            if (req.body.code == req.session.code.code) {
                return baseRender("- Recuperar Senha", 
                renderer("public/default/header"), 
                renderer("public/recover password/page3"),
                [ "component/menu" ],
                [ "component/menu", "recover-password" ]);
            }

            else {
                return baseRender("- Recuperar Senha", 
            renderer("public/default/header"), 
            renderer("public/recover password/page2", { status: renderer("default/status", { type: "error", message: "Código inválido" }) }),
            [ "component/menu" ],
            [ "component/menu", "recover-password" ]);
            }

        case "alter-password":
            const user = await Usuario.getAllUsers();

            for (let i = 0; i < user.length; i++) {
                if (user[i].email === req.session.code.email) {
                    user[i].senha = req.body.senha;
                    if (!await user[i].update()) throw Error("Ocorreu um erro ao atualizar sua senha");

                    await session.deleteSession(req);
                    session.createSession(req, user[i]);
                    res.redirect(301, "/");
                    return "";
                }
            };

            throw Error("Ocorreu um erro ao atualizar sua senha");

        default:
            throw Error("A chave de acesso informada não é válida");
    }
}

module.exports = { getView, setView };