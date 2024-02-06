const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const Administrador = require("./../../model/Administrador.js");
const Queue = require("../../model/Queue.js");

async function getView(req, res) {
    let view = "";

    const header = renderer("admin/default/header", { page: "PAINEL DE ADMINISTRAÇÃO" });
    const js = [ "component/user modal" ];
    const css = [ "home", "component/modal", "component/user modal" ];
    
    const queue = await Queue.getActiveQueue();
    let card = "";

    if (queue === null) {
        card = renderer("admin/home/no-queue");
    }

    else {
        card = renderer("admin/home/queue", {
            id: queue.id,
            quant_person: queue.tamanho
        });
    }

    const content = renderer("admin/default/user modal") + renderer("admin/home/index", {
        card: card
    })

    view = baseRender("- Painel de Administração", header, content, js, css);
    return view;
}

async function getEditView(req, res) {
    let view = "";

    const header = renderer("user/default/header", { page: "EDITAR PERFIL" });
    const js = [ "edit profile", "component/user modal" ];
    const css = [ "profile", "component/user modal" ];

    const user = await Usuario.getUsuarioById(req.session.user.id);

    if (user === null) throw Error("Usuário não encontrado");

    let params = {
        nome: user.nome.split(" ")[0],
        nome_completo: user.nome,
        email: user.email
    };

    for (let i = 0; i < 4; i++) {
        params["state-" + i] = Usuario.ENUM_vinculo_escolar[i] === user.vinculo_escolar ? "selected" : "";
    }

    const content = renderer("user/profile/edit", params);

    view = baseRender("- Editar Perfil", header, content, js, css);
    return view;
}

async function setEditView(req, res) {
    const user = await Usuario.getUsuarioById(req.session.user.id);

    if (user === null) throw Error("Usuário não encontrado");

    user.nome = req.body.nome;
    user.email = req.body.email;
    user.senha = req.body.senha.length > 0 ? req.body.senha : user.senha;
    user.vinculo_escolar = Usuario.ENUM_vinculo_escolar[Number(req.body.vinculo)];

    if (await user.update()) {
        res.redirect(301, "/profile");
        return;
    }

    throw Error("Falha ao atualizar o usuário");
}

module.exports = { getView, getEditView, setEditView };