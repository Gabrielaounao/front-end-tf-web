const connect = require("./connection.js");
const dateManager = require("./../tools/dateManager.js");

class Queue {

    constructor(id = undefined, nome = null, data_hora = null, tamanho = undefined, alunos = []) {
        this.id = id;
        this.nome = nome;
        this.data_hora = data_hora;
        this.tamanho = tamanho;
        this.alunos = alunos;
    }

    async create() { 
        const body = {
            nome: this.nome,
            data_hora: this.data_hora,
            tamanho: this.tamanho
        };

        const res = await connect("/fila/", "POST", body);
        this.id = (await Queue.initializeFromJSON(res)).id;
        return this.id !== undefined;
    }

    async update() {
        const body = {
            nome: this.nome,
            data_hora: this.data_hora,
            tamanho: this.tamanho
        };

        const res = await connect("/fila/" + this.id + "/update", "PUT", body);
        return await Queue.initializeFromJSON(res) !== null;
    }

    static async getAllQueues() {
        const res = JSON.parse(await connect("/filas"));
        let queues = [];

        for (let i = 0; i < res.length; i++) {
            queues.push(await Queue.initializeFromJSON(JSON.stringify(res[i])));
        };

        return queues;
    }

    static async getActiveQueue() {
        const res = await Queue.getAllQueues();
        let aux = [];

        for (let i = 0; i < res.length; i++) {
            if (dateManager.compareDates(dateManager.getDate(res[i].data_hora)) === 0) {
                if (dateManager.compareHours(dateManager.getHour(res[i].data_hora)) >= 0) {
                    aux.push(res[i]);
                }
            }
        }

        if (aux.length === 0) return null;

        let majorItem = aux[0];

        for (let i = 0; i < aux.length; i++) {
            if (dateManager.compareHours(dateManager.getHour(majorItem.data_hora), dateManager.getHour(aux[i].data_hora)) === -1) {
                majorItem = aux[i];
                i = 0;
            }
        }

        return majorItem;
    }

    static async getQueueById(id) {
        const res = await connect("/fila/" + id);
        return await Queue.initializeFromJSON(res);
    }

    static async initializeFromJSON(json) {
        try {
            const obj = JSON.parse(json);
            const queue = new Queue(obj.id, obj.nome, obj.data_hora, obj.tamanho, obj.alunos);

            if (Number(queue.tamanho) !== queue.alunos.length) {
                queue.tamanho = queue.alunos.length;
                await queue.update();
            }

            return queue;
        } catch {
            return null;
        }
    }
}

module.exports = Queue;