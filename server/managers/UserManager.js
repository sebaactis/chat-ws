import daoUsers from "../daos/daoUsers.js";

class UserManager {
    constructor() {
        this.dao = new daoUsers();
    }

    async login(data) {
        const {username, password} = data;

        const userCheck = await this.dao.getOne(username)

        if(password !== userCheck.password) {
            return 'Password invalid'
        }

        return userCheck;
    }

    async register(user) {
        const newUser = await this.dao.register(user)
        return newUser;
    }
}

export default UserManager;