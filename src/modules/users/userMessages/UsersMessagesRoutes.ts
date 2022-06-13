import express from "express";
import UserMessagesCtr from "./UserMessagesCtr";
import {vldAddUserMessage} from "./UserMessagesMw";
import {isAdmin, isAuth} from "../../auth/AuthMw";

const userMessagesRoutes = express.Router();

userMessagesRoutes.get("/", isAdmin, UserMessagesCtr.getAllUserMessages);
userMessagesRoutes.get("/:id", isAdmin, UserMessagesCtr.getUserMessageDetails);
userMessagesRoutes.post("/", isAuth, vldAddUserMessage, UserMessagesCtr.addUserMessage);

export default userMessagesRoutes;
