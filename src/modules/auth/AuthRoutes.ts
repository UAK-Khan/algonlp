import express from "express";
import AuthCtr from "./AuthCtr";
import {isAuth, isUnAuth, vldChangeUserPassword, vldForgotUserPassword, vldLoginUser, vldRegisterUser} from "./AuthMw";

const authRoutes = express.Router();

authRoutes.post("/register", isUnAuth, vldRegisterUser, AuthCtr.register);
authRoutes.post("/login", isUnAuth, vldLoginUser, AuthCtr.login);
authRoutes.put("/change-password", isAuth, vldChangeUserPassword, AuthCtr.changePassword);
authRoutes.post("/forgot-password", isUnAuth, vldForgotUserPassword, AuthCtr.forgotPassword);
authRoutes.get("/reset-password/:token", isUnAuth, AuthCtr.resetPassword);
authRoutes.get("/logout", AuthCtr.logout);
authRoutes.get("/session", isAuth, AuthCtr.getSession);

export default authRoutes;
