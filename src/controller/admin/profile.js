const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const Administrador = require("../../model/Administrador.js");

async function getView(req, res) {
    const header = renderer("user/default/header", { page: "PERFIL" });
    const js = [ "component/user modal" ];
    const css = [ "component/user modal", "profile" ];
    
    const admin = await Administrador.getAdministradorById(req.session.user.id);

    if (admin === null) throw Error("Administrador não encontrado");

    const content = renderer("admin/default/user modal") + renderer("admin/profile/index", {
        nome: admin.nome.split(" ")[0],
        nome_completo: admin.nome,
        email: admin.email,
        vinculo: admin.vinculo_escolar
    });

    return baseRender("- Ajuda", header, content, js, css);
}

async function getEditView(req, res) {
    let view = "";

    const header = renderer("admin/default/header", { page: "EDITAR PERFIL" });
    const js = [ "edit profile", "component/user modal" ];
    const css = [ "profile", "component/user modal" ];

    const admin = await Administrador.getAdministradorById(req.session.user.id);

    if (admin === null) throw Error("Administrador não encontrado");

    let params = {
        nome: admin.nome.split(" ")[0],
        nome_completo: admin.nome,
        email: admin.email
    };

    for (let i = 0; i < 4; i++) {
        params["state-" + i] = Administrador.ENUM_vinculo_escolar[i] === admin.vinculo_escolar ? "selected" : "";
    }

    const content = renderer("admin/default/user modal") + renderer("admin/profile/edit", params);

    view = baseRender("- Editar Perfil", header, content, js, css);
    return view;
}

async function setEditView(req, res) {
    const admin = await Administrador.getAdministradorById(req.session.user.id);

    if (admin === null) throw Error("Usuário não encontrado");

    admin.nome = req.body.nome;
    admin.email = req.body.email;
    admin.senha = req.body.senha.length > 0 ? req.body.senha : admin.senha;
    admin.vinculo_escolar = Administrador.ENUM_vinculo_escolar[Number(req.body.vinculo)];

    if (await admin.update()) {
        res.redirect(301, "/admin/profile");
        return;
    }

    throw Error("Falha ao atualizar o administrador");
}

module.exports = { getView, getEditView, setEditView };