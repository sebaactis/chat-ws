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
        const mensajes = await mensajesModel.deleteMany({ use: "messageItem" })
        return 'Users deleted'
    }
}

export default daoChats;