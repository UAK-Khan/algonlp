import {Knex} from "knex";
import {AboutRequestBodyType} from "../../interfaces/modulesTypes";
import AboutDao from "./AboutDao";
import Transaction = Knex.Transaction;

export const updateAboutDetails = async (trx: Transaction, data: AboutRequestBodyType) => {
  const about = await AboutDao.getFirstRow(trx);
  if (about?.id) return AboutDao.updateOneById(trx, {about: data.about}, about.id);
  else return AboutDao.insertOne(trx, {about: data.about});
}

export const getAboutDetails = async (trx: Transaction) => {
  return AboutDao.getFirstRow(trx);
}
