import UserManager from "../managers/UserManager.js";
import { generateToken, isValidPassword } from "../utils.js";
import registerValidation from "../validations/users/registerValidation.js";
import jwt from 'jsonwebtoken'

const key = 'WS-KEY';

const manager = new UserManager();

export const login = async (req, res, next) => {

    try {
        const data = req.body

        const userLogin = await manager.login(data);

        const passwordCheck = await isValidPassword(userLogin, data.password);
        if (!passwordCheck) res.status(400).json({ error: "Password Invalid" });

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
        res.status(200).json({ data: user });
    } catch (e) {
        console.log(e);
        next(e);
    }


}

export const register = async (req, res, next) => {
    try {
        const data = req.body;
        await registerValidation.parseAsync(data);

        const newUser = await manager.register(data);

        console.log(newUser);

        res.status(201).json({ status: "Register successfully", data: newUser })

    } catch (e) {
        next(e);
    }

}

export const logout = async (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.json({ message: 'Logout failed' });
        }

        res.send({ message: 'Logout successfull' });
    });

}

export const refreshToken = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decodedToken = jwt.decode(token, key)
        const tiempoActual = Math.floor(Date.now() / 1000);
        const tiempoRestante = decodedToken.exp - tiempoActual;

        if (tiempoRestante < 50) {
            const token = generateToken(decodedToken.user)
            return res.status(200).json({ token: token, check: true })
        } else {
            return res.status(200).json({ message: 'Token Activo', check: false })
        }
    }

    catch (err) {

        return res.status(404).json({ error: err })
    }
}