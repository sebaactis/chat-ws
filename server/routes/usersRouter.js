import { Router } from "express";
import { login, logout, refreshToken, register } from "../controllers/usersController.js";
import { authToken, verifyToken } from "../utils.js";

const usersRouter = Router();

usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.post('/logout', authToken, logout);
usersRouter.post('/refreshtoken', verifyToken, refreshToken);

export default usersRouter;