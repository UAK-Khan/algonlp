import {Knex} from "knex";
import {AuthChangePasswordRequestBodyType, UserRequestBodyType} from "../../interfaces/modulesTypes";
import UsersDao from "./UsersDao";
import UsersModel from "./UsersModel";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";
import {msgUserAlreadyExists} from "../../misc/responseMessages";
import {bcryptHash} from "../../core/utils/bcryptUtils";
import Transaction = Knex.Transaction;
import UserVerificationDao from "../auth/userVerification/UserVerificationDao";
import {sendMail} from "../../core/utils/emailUtils";
import {getEmailVerificationTemplate} from "../../misc/emailTemplates/emailVerificationTemplate";
import {generateRandomPassword} from "../../core/utils/stringUtils";
import {getEnvVar} from "../../core/utils/envUtils";

const responseFields = ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"] as (keyof UsersModel)[];

export const saveUser = async (trx: Transaction, data: UsersModel):Promise<UsersModel> => {
  const {firstName, lastName, email, type} = data;
  const password = await bcryptHash(data.password);
  const [user] = await UsersDao.insertOne(trx, {firstName, lastName, email, password, type});
  return user;
}

export const addUser = async (trx: Transaction, data: UserRequestBodyType): Promise<UsersModel> => {
  const email = data.email.trim();
  if (await UsersDao.findOneByCol(trx, "email", email)) throw new UnprocessableEntityErrorModel(msgUserAlreadyExists);
  return saveUser(trx, data as UsersModel);
}

export const changeUserPassword = async (
  trx: Transaction,
  userId: string,
  data: AuthChangePasswordRequestBodyType
) => {
  const newPassword = await bcryptHash(data.newPassword);
  await UsersDao.updateOneById(trx, {password: newPassword}, userId);
}

export const getAllUsers = (trx: Transaction) => {
  return UsersDao.getAllUsers(trx, responseFields);
}

export const getUser = (trx: Transaction, userId: string) => {
  return UsersDao.findOneById(trx, userId, responseFields);
}

export const sendVerificationDetails = async (trx: Transaction, user: UsersModel) => {
  const verificationCode = generateRandomPassword(12);
  const verificationLink = `${getEnvVar("DOMAIN")}/verify-account/${user.id}/${verificationCode}`;
  await UserVerificationDao.insertOne(trx, {
    userId: user.id as string,
    verificationCode,
  });
  const emailResp = await sendMail({
    to: user.email,
    subject: "Welcome to Algonlp! Please verify your email",
    html: getEmailVerificationTemplate(user.firstName, verificationLink),
  });
  console.log(emailResp.response);
}
