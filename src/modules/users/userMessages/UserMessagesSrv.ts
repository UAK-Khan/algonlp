import {Knex} from "knex";
import {UserMessagesRequestBodyType} from "../../../interfaces/modulesTypes";
import UserMessagesDao from "./UserMessagesDao";
import Transaction = Knex.Transaction;

export const addUserMessage = (trx: Transaction, userId: string, data: UserMessagesRequestBodyType) => {
  const {phone, message} = data;
  return UserMessagesDao.insertOne(trx, {userId, phone, message});
};

export const getAllUserMessages = (trx: Transaction) => {
  return UserMessagesDao.getAllUserMessages(trx);
};

export const getUserMessageDetails = (trx: Transaction, userMessageId: string) => {
  return UserMessagesDao.findOneById(trx, userMessageId, ["message"]);
};

