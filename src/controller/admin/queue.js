const renderer = require("./../../tools/renderer.js");
const baseRender = require("./../base.js");
const dateManager = require("./../../tools/dateManager.js");
const Queue = require("./../../model/Queue.js");
const Usuario = require("./../../model/Usuario.js");

async function getView(req, res) {
    const queue = await Queue.getQueueById(req.params.id);
    if (queue === null) throw Error("Fila não encontrada");

    let view = "";
    const header = renderer("admin/default/header", { page: "FILAS" });
    const js = [ "component/user modal", "queue" ];
    const css = [ "component/modal", "component/user modal", "queue" ];

    const content = renderer("admin/default/user modal") + renderer("admin/queue/index", {
        nome: queue.nome,
        hora: dateManager.getHour(queue.hora),
        tamanho: queue.tamanho
    });
    
    view = baseRender("- Fila", header, content, js, css);
    return view;
}

async function getManageView(req, res) {
    let view = "";
    const header = renderer("admin/default/header", { page: "FILAS" });
    const js = [ "component/user modal" ];
    const css = [ "component/modal", "component/user modal", "manage queue" ];

    const queues = await Queue.getAllQueues();
    let lines = "";

    queues.forEach(element => {
        lines += renderer("admin/queues/line", {
            id: element.id,
            nome: element.nome,
            hora: dateManager.getHour(element.data_hora),
            tamanho: element.tamanho
        });
    });

    const content = renderer("admin/default/user modal") + renderer("admin/queues/index", {
        items: lines
    });

    view = baseRender("- Filas", header, content, js, css);
    return view;
}

function getNewView(req, res) {
    let view = "";
    const header = renderer("admin/default/header", { page: "NOVA FILA" });
    const js = [ "component/user modal" ];
    const css = [ "component/modal", "component/user modal", "queue" ];
    const content = renderer("admin/default/user modal") + renderer("admin/queue/new");

    view = baseRender("- Nova Fila", header, content, js, css);
    return view;
}

async function setView(req, res) {
    switch (req.body.token) {
        case "update":
            const queue = await Queue.getQueueById(req.params.id);
            if (queue === null) throw Error("Fila não encontrada");

            queue.nome = req.body.nome;
            queue.data_hora = req.body.hora;
            queue.tamanho = queue.alunos.length;

            if (!await queue.update()) throw Error("Ocorreu um erro ao atualizar a fila");

            res.redirect(301, "/admin/queue/" + queue.id);
            return "";

        case "call next":
            const queue2 = await Queue.getQueueById(req.params.id);
            if (queue2 === null) throw Error("Fila não encontrada");

            const quant = req.body.quant;
            let users = [];

            for (let i = queue2.alunos.length - 1; i > queue2.alunos.length - 1 - (quant > queue2.alunos.length ? queue2.alunos.length : quant); i--) {
                users.push(await Usuario.getUsuarioById(queue2.alunos[i]));
            }

            await users.forEach(async element => {
                element.tipo_usuario = "selecionado";
                await element.update();
            });

            res.redirect(301, "/admin/queue/" + queue2.id);
            return "";

        case "delete":
            const queue3 = await Queue.getQueueById(req.params.id);
            if (queue3 === null) throw Error("Fila não encontrada");

            const alunos = queue3.alunos;

            await alunos.forEach(async element => {
                const user = await Usuario.getUsuarioById(element);
                await user.leaveQueue(queue3.id);
            });

            queue3.tamanho = queue3.length;
            await queue3.update();

            res.redirect(301, "/admin/queue/" + queue3.id);
            return "";

        default:
            throw Error("A chave de acesso informada é inválida");
    }
}

async function setNewView(req, res) {
    if (req.body.token !== "create") throw Error("A chave de acesso é inválida");

    const queue = new Queue(undefined, req.body.nome, req.body.hora, 0);

    if (!await queue.create()) throw Error("Ocorreu um erro ao cadastrar a fila");

    res.redirect(301, "/admin/queue/" + queue.id);
    return;
}

module.exports = { getView, getManageView, getNewView, setView, setNewView };