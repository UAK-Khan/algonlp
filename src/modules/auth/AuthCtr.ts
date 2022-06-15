import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {
  AuthChangePasswordRequestBodyType,
  AuthForgotPasswordRequestBodyType,
  UserRequestBodyType
} from "../../interfaces/modulesTypes";
import {
  msgAuthForgotPasswordEmailSent,
  msgAuthPasswordUpdated, msgAuthVerifyAccVerified,
  msgUserLoggedIn,
  msgUserRegistered
} from "../../misc/responseMessages";
import {addUser, changeUserPassword, sendVerificationDetails} from "../users/UsersSrv";
import {forgotPassword, resetPassword, verifyAccount, verifyLogin} from "./AuthSrv";
import {destroySession, saveSession} from "../../core/utils/sessionUtils";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";
import {msgLogout} from "../../misc/systemMessages";
import {
  FE_REDIRECT_AFTER_ADMIN_LOGIN,
  FE_REDIRECT_AFTER_USER_LOGIN,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_PATH
} from "../../configs/appConfigs";
import {getUserSession} from "./AuthMw";
import {getEnvVar} from "../../core/utils/envUtils";

class AuthCtr {

  static async login(
    req: Request<{}, {}, Pick<UserRequestBodyType, "email" | "password">>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        const sessionData = await verifyLogin(trx, requestBody);
        saveSession(req, sessionData);
        const redirectAfterLogin = sessionData.type === "admin" ? FE_REDIRECT_AFTER_ADMIN_LOGIN : FE_REDIRECT_AFTER_USER_LOGIN;
        res.sendObject({redirect: redirectAfterLogin}, msgUserLoggedIn);
      });
    } catch (e) {
      next(e);
    }
  }

  static async register(
    req: Request<{}, {}, UserRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        const user = await addUser(trx, requestBody);
        await sendVerificationDetails(trx, user);
        res.sendMsg(msgUserRegistered);
      });
    } catch (e) {
      next(e);
    }
  }

  static async forgotPassword(
    req: Request<{}, {}, AuthForgotPasswordRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        await forgotPassword(trx, requestBody);
        res.sendMsg(msgAuthForgotPasswordEmailSent);
      });
    } catch (e) {
      next(e);
    }
  }

  static async resetPassword(
    req: Request<{ token: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.params.token;
      await DB.transaction(async (trx) => {
        const sessionData = await resetPassword(trx, token);
        saveSession(req, sessionData);
        // todo: get all routes from app from routes constants file
        const routeToResetPasswordPageOnFe = `${getEnvVar("DOMAIN")}/change-password`;
        res.redirect(routeToResetPasswordPageOnFe);
      });
    } catch (e) {
      next(e);
    }
  }

  static async changePassword(
    req: Request<{}, {}, AuthChangePasswordRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      const userSession = getUserSession(req);
      await DB.transaction(async (trx) => {
        await changeUserPassword(trx, userSession.id, requestBody)
        res.sendMsg(msgAuthPasswordUpdated);
      });
    } catch (e) {
      next(e);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      destroySession(req, (err) => {
        if (err) throw new UnprocessableEntityErrorModel(err.message);
        else {
          res.clearCookie(SESSION_COOKIE_NAME, {
            path: SESSION_COOKIE_PATH
          }).sendMsg(msgLogout);
        }
      });
    } catch (e) {
      next(e);
    }
  }

  static async getSession(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.sendObject(req.session.user);
    } catch (e) {
      next(e);
    }
  }

  static async verifyAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, verificationCode } = req.params;
      await DB.transaction(async (trx) => {
        await verifyAccount(trx, { userId, verificationCode });
        res.sendMsg(msgAuthVerifyAccVerified);
      });
    } catch (e) {
      next(e);
    }
  }
}

export default AuthCtr;
