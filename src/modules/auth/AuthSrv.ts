import {Knex} from "knex";
import {AuthForgotPasswordRequestBodyType, UserRequestBodyType, UserSessionType} from "../../interfaces/modulesTypes";
import UsersDao from "../users/UsersDao";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";
import {msgPwdResetTokenExpired, msgUserInvalidLogin} from "../../misc/responseMessages";
import {bcryptCompare, bcryptHash} from "../../core/utils/bcryptUtils";
import {generateRandomBytes, generateRandomPassword} from "../../core/utils/stringUtils";
import ResetTokenDao from "./resetToken/ResetTokenDao";
import ResetTokenModel from "./resetToken/ResetTokenModel";
import {RESET_PASSWORD_TOKEN_EXPIRY_TIME_IN_MS} from "../../configs/appConfigs";
import {msgBadRequest} from "../../misc/systemMessages";
import {getEnvVar} from "../../core/utils/envUtils";
import Transaction = Knex.Transaction;

export const verifyLogin = async (
  trx: Transaction,
  data: Pick<UserRequestBodyType, "email" | "password">
): Promise<UserSessionType> => {
  const {email, password} = data;
  const user = await UsersDao.findOneByCol(trx, "email", email);
  if (!user) throw new UnprocessableEntityErrorModel(msgUserInvalidLogin);
  const verifiedPassword = await bcryptCompare(password, user.password);
  if (!verifiedPassword) throw new UnprocessableEntityErrorModel(msgUserInvalidLogin);

  return {
    id: user.id as string,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    type: user.type
  };
}

export const forgotPassword = async (trx: Transaction, data: AuthForgotPasswordRequestBodyType) => {
  const user = await UsersDao.findOneByCol(trx, "email", data.email);
  if (user?.id) {
    const resetToken = generateRandomBytes();
    const expiryInMilliseconds = RESET_PASSWORD_TOKEN_EXPIRY_TIME_IN_MS();
    const data: ResetTokenModel = {userId: user.id, token: resetToken, expiryInMilliseconds};

    const existingToken = await ResetTokenDao.findOneByCol(trx, "userId", user.id);
    if (existingToken?.id) {
      await ResetTokenDao.updateOneById(trx, data, existingToken.id);
    } else {
      await ResetTokenDao.insertOne(trx, data);
    }

    const routeToResetPasswordPageOnBk = `${getEnvVar("BK_URL")}/api/auth/reset-password/${resetToken}`;
    // todo: email link
    console.log(routeToResetPasswordPageOnBk);
  }
}

export const resetPassword = async (trx: Transaction, token: string) => {
  const tokenModel = await ResetTokenDao.findOneByCol(trx, "token", token);
  if (tokenModel?.id) {
    const isTokenExpired = tokenModel.expiryInMilliseconds > RESET_PASSWORD_TOKEN_EXPIRY_TIME_IN_MS();
    if (!isTokenExpired) {
      const user = await UsersDao.findOneById(trx, tokenModel.userId);
      const newRandomPwd = await bcryptHash(generateRandomPassword());
      await UsersDao.updateOneById(trx, {password: newRandomPwd}, user.id as string);
      await ResetTokenDao.deleteOneById(trx, tokenModel.id);
      return {
        id: user.id as string,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type
      }
    } else {
      throw new UnprocessableEntityErrorModel(msgPwdResetTokenExpired);
    }
  }
  throw new UnprocessableEntityErrorModel(msgBadRequest)
}
