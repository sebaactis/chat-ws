import { Router } from "express";
import { login, register } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.post('/login', login);
usersRouter.post('/register', register);

export default usersRouter;