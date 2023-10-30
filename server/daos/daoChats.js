import { mensajesModel } from "../models/mensajesModel.js";

class daoChats {
    async getAll() {
        const mensajes = mensajesModel.find();
        return mensajes;
    }

    async create(mensaje) {

        const newMensaje = mensajesModel.create(mensaje);
        return newMensaje;
    }

    async deleteAll() {
        const mensajes = mensajesModel.deleteMany({ 'use': 'messageItem' })
        console.log(mensajes);
        return 'Users deleted'
    }
}

export default daoChats;