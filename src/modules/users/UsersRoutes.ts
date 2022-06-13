import express from "express";
import UsersCtr from "./UsersCtr";
import {isAdmin} from "../auth/AuthMw";

const usersRoutes = express.Router();

usersRoutes.get("/", isAdmin, UsersCtr.getAllUsers);
usersRoutes.get("/:id", isAdmin, UsersCtr.getUser);

export default usersRoutes;
