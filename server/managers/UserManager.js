import daoUsers from "../daos/daoUsers.js";
import { createHash } from "../utils.js";

class UserManager {
    constructor() {
        this.dao = new daoUsers();
    }

    async login(data) {
        const { username, password } = data;
        if (!username || !password) return 'One data is missing, please try again'

        const userCheck = await this.dao.getOne(username)
        return userCheck;
    }

    async register(user) {

        const { username, password, confPassword } = user;

        if (password !== confPassword) throw new Error ('Password and confirm password do not match')

        const payload = {
            username,
            password: await createHash(password)
        }
        const newUser = await this.dao.register(payload)

        return newUser;
    }
}

export default UserManager;