import { Router } from "express";
import { addChat, getChats } from "../controllers/chatController.js";
import { authToken } from "../utils.js";

const chatRouter = Router();

chatRouter.get('/',  getChats);
chatRouter.post('/', addChat);

export default chatRouter;

