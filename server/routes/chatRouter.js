import { Router } from "express";
import { addChat, deleteChats, getChats } from "../controllers/chatController.js";
import { authToken } from "../utils.js";

const chatRouter = Router();

chatRouter.get('/', authToken, getChats);
chatRouter.post('/', authToken,  addChat);
chatRouter.delete('/', deleteChats);

export default chatRouter;

