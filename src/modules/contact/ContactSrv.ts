import {Knex} from "knex";
import {ContactRequestBodyType} from "../../interfaces/modulesTypes";
import ContactDao from "./ContactDao";
import Transaction = Knex.Transaction;

export const saveContactUsDetails = async (trx: Transaction, data: ContactRequestBodyType) => {
  const {
    email, phone, name, message
  } = data;
  await ContactDao.insertOne(trx, {
    email, phone, name, message
  });
}

export const getAllContacts = async (trx: Transaction) => {
  return ContactDao.getAll(trx);
}
