const connect = require("./connection.js");

class Cardapio {

    constructor(id = undefined, link = null) {
        this.id = id;
        this.link = link;
    }

    async create() { 
        const body = {
            link: this.link
        };

        const res = await connect("/cardapio/", "POST", body);
        this.id = Cardapio.initializeFromJSON(res).id;
        require("fs").writeFileSync(__dirname + "/log.html", res);
        return this.id !== undefined;
    }

    async update() {
        const body = {
            link: this.link
        };

        const res = await connect("/cardapio/" + this.id + "/update", "PUT", body);
        return Cardapio.initializeFromJSON(res) !== null;
    }

    static async getAllCardapios() {
        const res = JSON.parse(await connect("/cardapios/"));

        return res.map(element => {
            return Cardapio.initializeFromJSON(JSON.stringify(element));
        })
    }

    static async getCardapioById(id) {
        const res = await connect("/cardapio/" + id);
        return Cardapio.initializeFromJSON(res);
    }

    static initializeFromJSON(json) {
        try {
            const obj = JSON.parse(json);
            return new Cardapio(obj.id, obj.link);
        } catch {
            return null;
        }
    }
}

module.exports = Cardapio;