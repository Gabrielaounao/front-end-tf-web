const connect = require("./connection.js");

class Usuario {

    constructor(id = undefined, nome = null, email = null, senha = null, vinculo_escolar = null, tipo_usuario = "null") {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.vinculo_escolar = vinculo_escolar,
        this.tipo_usuario = tipo_usuario;
    }

    static ENUM_vinculo_escolar = [
        "Regime Interno",
        "Ensino Superior",
        "Ensino Médio",
        "Funcionário"
    ];

    async create() {
        const body = {
            ID: await Usuario.getNewId(),
            Nome: this.nome,
            Email: this.email,
            Senha: this.senha,
            Vinculo_Escolar: this.vinculo_escolar,
            Tipo_Usuario: this.tipo_usuario
        }

        const res = await connect("/usuario/", "POST", body);
        this.id = Usuario.initializeFromJSON(res).id;

        return this.id !== undefined;
    }

    async update() {
        const body = {
            Nome: this.nome,
            Email: this.email,
            Senha: this.senha,
            Vinculo_Escolar: this.vinculo_escolar,
            Tipo_Usuario: this.tipo_usuario
        }

        const res = await connect("/usuario/" + this.id + "/", "PUT", body);

        return Usuario.initializeFromJSON(res) !== null;
    }

    async joinQueue(queueId) {
        const res = await connect("/fila/" + queueId + "/join/", "POST", { student_id: this.id });
        return res.length === 0;
    }

    async leaveQueue(queueId) {
        const res = await connect("/fila/" + queueId + "/leave/", "DELETE", { student_id: this.id });
        return res.length === 0;
    }

    static async getUsuarioById(id) {
        const res = await connect("/usuario/" + id);
        return Usuario.initializeFromJSON(res);
    }

    static async getAllUsers() {
        const res = JSON.parse(await connect("/usuarios"));

        return res.map(element => {
            return Usuario.initializeFromJSON(JSON.stringify(element));
        });
    }

    static initializeFromJSON(json) {
        try {
            const obj = JSON.parse(json);
            return new Usuario(obj.ID, obj.Nome, obj.Email, obj.Senha, obj.Vinculo_Escolar, obj.Tipo_Usuario);
        } catch {
            return null;
        }
    }

    static async getNewId() {
        const users = await Usuario.getAllUsers();
        let id = [];

        users.forEach(element => {
            id.push(element.id);
        })

        id = id.sort((a, b) => a - b);

        return id[id.length - 1] + 1;
    }
}

module.exports = Usuario;