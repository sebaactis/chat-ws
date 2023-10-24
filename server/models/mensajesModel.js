import mongoose from "mongoose";

const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    body: String,
    from: String
})

export const mensajesModel = mongoose.model(mensajesCollection, mensajesSchema);