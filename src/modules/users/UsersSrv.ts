import {Knex} from "knex";
import {AuthChangePasswordRequestBodyType, UserRequestBodyType} from "../../interfaces/modulesTypes";
import UsersDao from "./UsersDao";
import UsersModel from "./UsersModel";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";
import {msgUserAlreadyExists} from "../../misc/responseMessages";
import {bcryptHash} from "../../core/utils/bcryptUtils";
import Transaction = Knex.Transaction;

const responseFields = ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"] as (keyof UsersModel)[];

export const saveUser = async (trx: Transaction, data: UsersModel) => {
  const {firstName, lastName, email, type} = data;
  const password = await bcryptHash(data.password);
  await UsersDao.insertOne(trx, {firstName, lastName, email, password, type})
}

export const addUser = async (trx: Transaction, data: UserRequestBodyType) => {
  const email = data.email.trim();
  if (await UsersDao.findOneByCol(trx, "email", email)) throw new UnprocessableEntityErrorModel(msgUserAlreadyExists);
  await saveUser(trx, data as UsersModel);
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
  return UsersDao.getAll(trx, responseFields);
}

export const getUser = (trx: Transaction, userId: string) => {
  return UsersDao.findOneById(trx, userId, responseFields);
}
