import ChatManager from "../managers/ChatManager.js";

const manager = new ChatManager();

export const getChats = async (req, res) => {
    try {
        const mensajes = await manager.getAll();
        res.status(200).json({ result: 'success', payload: mensajes });
    }

    catch (err) {
        console.error(err);
    }
}

export const addChat = async (req, res) => {

    const data = req.body;

    const payload = {
        body: data.body,
        from: data.from
    }

    const mensaje = await manager.create(payload);

    res.send({ result: 'success', payload: mensaje });
}