import { usersModel } from "../models/usersModel.js";

class daoUsers {

    async getOne(username) {
        const user = await usersModel.findOne({ username })

        if(!user) {
            return 'User not found'
        }

        return user;
    }

    async login() {

    }

    async register(user) {
        const newUser = await usersModel.create(user)
        return newUser;
    }
}

export default daoUsers;