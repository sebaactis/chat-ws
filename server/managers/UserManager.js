import { createHash, isValidPassword } from "../../utils.js";
import daoUsers from "../daos/daoUsers.js";

class UserManager {
    constructor() {
        this.dao = new daoUsers();
    }

    async login(data) {
        const { username, password } = data;

        if(!username || !password) return 'One data is missing, please try again'

        const userCheck = await this.dao.getOne(username)
        const passwordCheck = await isValidPassword(userCheck, password);

        if(!passwordCheck) return 'Password invalid';

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