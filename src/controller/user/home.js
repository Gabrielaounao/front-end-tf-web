const renderer = require("./../../tools/renderer.js");
const dateManager = require("./../../tools/dateManager.js");
const baseRender = require("./../base.js");
const Queue = require("./../../model/Queue.js");
const Usuario = require("../../model/Usuario.js");

async function getView(req, res) {
    const queue = await Queue.getActiveQueue();

    if (queue === null) {
        return await getHomeView(req, res, null);
    }

    for (let i = 0; i < queue.alunos.length; i++) {
        if (queue.alunos[i] === req.session.user.id) {
            const user = await Usuario.getUsuarioById(req.session.user.id);

            if (user === null) throw Error("Usuário não encontrado");

            if (user.tipo_usuario === "selecionado") {
                return await getConfirmView(req, res);
            }

            return await getJoinedView(req, res, queue);
        }
    }

    return await getHomeView(req, res, queue);
}

async function setView(req, res) {
    switch (req.body.token) {
        case "join-queue":
            const queue = await Queue.getActiveQueue();
            
            if (queue === null) throw Error("Não existem filas disponíveis");

            const user = await Usuario.getUsuarioById(req.session.user.id);

            if (user === null) throw Error("Usuário não encontrado");

            if (!await user.joinQueue(queue.id)) throw Error("Erro ao entrar na fila");

            return await getJoinedView(req, res, await Queue.getQueueById(queue.id), true);

        case "leave-queue":
            const queue2 = await Queue.getActiveQueue();

            if (queue2 === null) throw Error("Não existem filas disponíveis");

            const user2 = await Usuario.getUsuarioById(req.session.user.id);

            if (user2 === null) throw Error("Usuário não encontrado");

            if (!await user2.leaveQueue(queue2.id)) throw Error("Erro ao sair da fila");

            res.redirect(301, "/");
            return;

        case "confirm-queue":
            const queue3 = await Queue.getActiveQueue();

            if (queue3 === null) throw Error("Não existem filas disponíveis");

            const user3 = await Usuario.getUsuarioById(req.session.user.id);

            if (user3 === null) throw Error("Usuário não encontrado");

            if (!await user3.leaveQueue(queue3.id)) throw Error ("Erro ao confirmar a entrada");

            user3.tipo_usuario = "null";
            user3.update();

            res.redirect(301, "/");
            return;

        default:
            throw Error("Chave de controle inválida");
    }
}

async function getHomeView(req, res, queue) {
    let view = "";

    const header = renderer("user/default/header", { page: "HOME" });
    const js = [ "home", "component/user modal" ];
    const css = [ "home", "component/user modal", "component/modal" ];

    let hour_initial, quant_person;

    if (queue !== null) {
        hour_initial = dateManager.getHour(queue.data_hora);
        quant_person = queue.tamanho;

        next_queue_card = renderer("user/home/next-queue-card", {
            quant_person: quant_person
        });
    }
   
    else {
        next_queue_card = renderer("user/home/no-next-queue-card");
        hour_initial = "00:00";
        quant_person = 0;
    }

    const content = renderer("user/home/index", {
        next_queue: next_queue_card,
        hour_initial: hour_initial,
        quant_person: quant_person,
        button_state: queue !== null ? "" : "disabled"
    });

    view = baseRender("", header, content, js, css);
    return view;
}

async function getJoinedView(req, res, queue, showModal = false) {
    let view = "";
    const header = renderer("user/default/header", { page: "HOME" });
    const js = [ "home", "joined", "component/user modal" ];
    const css = [ "home", "component/user modal", "component/modal" ];

    let position = -1;

    for (let i = queue.alunos.length - 1; i >= 0; i--) {
        if (req.session.user.id === queue.alunos[i]) position = i + 1;
    }

    const content = renderer("user/home/joined", {
        quant_person: queue.tamanho,
        position: position,
        hour_initial: dateManager.getHour(queue.data_hora),
        show_modal: showModal ? "block" : "none"
    });

    view = baseRender("", header, content, js, css);
    return view;
}

async function getConfirmView(req, res) {
    let view = "";
    const header = renderer("user/default/header", { page: "HOME" });
    const js = [ "home", "component/user modal" ];
    const css = [ "home", "component/user modal", "component/modal" ];
    const content = renderer("user/home/confirm");

    view = baseRender("", header, content, js, css);
    return view;
}

module.exports = { getView, setView };