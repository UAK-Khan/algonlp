import {requiredBodyFieldVld} from "../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../core/middlewares/requestValidationResultMw";
import {MIN_PASSWORD_LENGTH} from "../../configs/appConfigs";
import UsersModel from "../users/UsersModel";
import {NextFunction, Request, Response} from "express";
import {msgAuthenticationDenied, msgAuthorizationDenied, msgBadRequest} from "../../misc/systemMessages";
import {codeAuthDenied, codeBadRequest, codeProhibited} from "../../misc/responseCode";
import {SessionData} from "express-session";
import UsersDao from "../users/UsersDao";
import {DB} from "../../core/knex/knexConfigs";
import {Knex} from "knex";
import {UserSessionType} from "../../interfaces/modulesTypes";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";

export const vldRegisterUser = [
  requiredBodyFieldVld(UsersModel.col("firstName", false)),
  requiredBodyFieldVld(UsersModel.col("lastName", false)),
  requiredBodyFieldVld(UsersModel.col("email", false)).isEmail().normalizeEmail(),
  requiredBodyFieldVld(UsersModel.col("password", false)).isLength({min: MIN_PASSWORD_LENGTH}),
  validationResultMW,
];

export const vldLoginUser = [
  requiredBodyFieldVld(UsersModel.col("email", false)).isEmail().normalizeEmail(),
  requiredBodyFieldVld(UsersModel.col("password", false)).isLength({min: MIN_PASSWORD_LENGTH}),
  validationResultMW,
];

export const vldChangeUserPassword = [
  requiredBodyFieldVld("newPassword"),
  validationResultMW,
];

export const vldForgotUserPassword = [
  requiredBodyFieldVld(UsersModel.col("email", false)).isEmail().normalizeEmail(),
  validationResultMW,
];


const hasSession = (req: Request) => {
  return req.session && req.session.user
}

export const getUserSession = (req: Request): UserSessionType => {
  if (req.session?.user) return req.session.user;
  else throw new UnprocessableEntityErrorModel(msgAuthenticationDenied);
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (hasSession(req)) {
    next();
  } else {
    res.status(codeAuthDenied).json({message: msgAuthenticationDenied});
  }
}

export const isUnAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!hasSession(req)) {
    next();
  } else {
    res.status(codeBadRequest).json({message: msgBadRequest});
  }
}

export const isAdminUser = async (session: SessionData) => {
  const userId = session.user.id;
  const adminUser = await UsersDao.findOneByPredicate(DB as Knex.Transaction, {
    id: userId,
    type: "admin"
  });
  return !!adminUser;
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!hasSession(req)) {
    res.status(codeAuthDenied).json({message: msgAuthenticationDenied});
  } else if (!(await isAdminUser(req.session as SessionData))) {
    res.status(codeProhibited).json({message: msgAuthorizationDenied});
  } else next();
}
