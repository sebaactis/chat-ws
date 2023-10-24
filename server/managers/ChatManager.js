import daoChats from "../daos/daoChats.js";

class ChatManager {
    constructor() {
        this.dao = new daoChats();
    }

    async getAll() {
        const mensajes = await this.dao.getAll();
        return mensajes;
    }

    async create(mensaje) {

        const newMensaje = await this.dao.create(mensaje);
        return newMensaje;
    }
}

export default ChatManager;