import { usersModel } from "../models/usersModel.js";

class daoUsers {

    async getOne(username) {
        const user = await usersModel.findOne({ username })

        if (!user) {
            throw new Error("User Not Found");
        }

        return user;
    }

    async register(user) {
        const newUser = await usersModel.create(user)
        return newUser;
    }
}

export default daoUsers;