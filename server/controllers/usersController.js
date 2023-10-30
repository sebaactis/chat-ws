import UserManager from "../managers/UserManager.js";
import { generateToken, isValidPassword } from "../utils.js";

const manager = new UserManager();

export const login = async (req, res) => {
    const data = req.body

    const userLogin = await manager.login(data);

     const passwordCheck = await isValidPassword(userLogin, data.password);
        if (!passwordCheck) return 'Password invalid';

        const token = generateToken(userLogin.username)

        req.session.accessToken = token
        req.session.user = userLogin.username

        res.cookie('accessToken', token, {
            maxAge: 10000,
            httpOnly: true
        })

        const user = {
            username: userLogin.username,
            token: token
        }

    res.status(200).json({status: 'Login successful', data: user});
}

export const register = async (req, res) => {
    const data = req.body;

    const newUser = await manager.register(data);

    console.log(newUser);

    res.status(201).json({status: "Register successfully", data: newUser})

}