import ChatManager from "../managers/ChatManager.js";

const manager = new ChatManager();

export const getChats = async (req, res, next) => {
    try {
        const mensajes = await manager.getAll();
        res.status(200).json({ result: 'success', payload: mensajes });
    }

    catch (e) {
        next(e);
    }
}

export const addChat = async (req, res) => {

    const data = req.body;

    const payload = {
        body: data.body,
        from: data.from,
        use: data.use
    }

    const mensaje = await manager.create(payload);

    res.send({ result: 'success', payload: mensaje });
}

export const deleteChats = async (req, res) => {
    await manager.deleteAll();
    res.status(200).json({ result: 'success', payload: 'Deleted'})
}