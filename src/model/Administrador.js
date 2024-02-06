const connect = require("./connection.js");

class Administrador {

    constructor(id = undefined, nome = null, email = null, senha = null, vinculo_escolar = "null") {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.vinculo_escolar = vinculo_escolar
    }

    static ENUM_vinculo_escolar = [
        "Regime Interno",
        "Ensino Superior",
        "Ensino Médio",
        "Funcionário"
    ];

    async create() {
        const body = {
            ID: await Administrador.getNewId(),
            Nome: this.nome,
            Email: this.email,
            Senha: this.senha,
            Vinculo_Escolar: this.vinculo_escolar
        }

        const res = await connect("/admin/", "POST", body);
        this.id = Administrador.initializeFromJSON(res).id;

        return this.id !== undefined;
    }

    async update() {
        const body = {
            Nome: this.nome,
            Email: this.email,
            Senha: this.senha,
            Vinculo_Escolar: this.vinculo_escolar
        }

        const res = await connect("/admin/" + this.id + "/", "PUT", body);

        return Administrador.initializeFromJSON(res) !== null;
    }

    static async getAdministradorById(id) {
        const res = await connect("/admin/" + id);
        return Administrador.initializeFromJSON(res);
    }

    static async getAllAdministradores() {
        const res = JSON.parse(await connect("/admins"));

        return res.map(element => {
            return Administrador.initializeFromJSON(JSON.stringify(element));
        });
    }

    static initializeFromJSON(json) {
        try {
            const obj = JSON.parse(json);
            return new Administrador(obj.ID, obj.Nome, obj.Email, obj.Senha, obj.Vinculo_Escolar);
        } catch {
            return null;
        }
    }

    static async getNewId() {
        const admins = await Usuario.getAllAdministradores();
        let id = [];

        admins.forEach(element => {
            id.push(element.id);
        })

        id = id.sort((a, b) => a - b);

        return id[id.length - 1] + 1;
    }
}

module.exports = Administrador;