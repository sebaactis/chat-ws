import UserManager from "../managers/UserManager.js";

const manager = new UserManager();

export const login = async (req, res) => {
    const data = req.body

    const login = await manager.login(data);

    res.status(200).json({status: 'Login successful', data: login});
}

export const register = async (req, res) => {
    const data = req.body;

    const newUser = await manager.register(data);

    console.log(newUser);

    res.status(201).json({status: "Register successfully", data: newUser})

}