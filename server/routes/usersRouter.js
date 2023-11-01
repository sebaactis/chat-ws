import { Router } from "express";
import { login, logout, register } from "../controllers/usersController.js";
import { authToken } from "../utils.js";

const usersRouter = Router();

usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.post('/logout', authToken, logout);

export default usersRouter;