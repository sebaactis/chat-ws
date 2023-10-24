import mongoose from "mongoose";

const usersCollection = 'users'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
})

export const usersModel = mongoose.model(usersCollection, userSchema)