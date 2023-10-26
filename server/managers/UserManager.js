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
        if (!userCheck) return 'User does not exist'

        return userCheck;
    }

    async register(user) {

        const payload = {
            ...user,
            password: await createHash(user.password)
        }
        const newUser = await this.dao.register(payload)

        return newUser;
    }
}

export default UserManager;