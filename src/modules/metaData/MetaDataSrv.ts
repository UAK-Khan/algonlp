import {Knex} from "knex";
import MetaDataDao from "./MetaDataDao";
import {MetaDataRequestBodyType} from "../../interfaces/modulesTypes";
import MetaDataModel from "./MetaDataModel";
import Transaction = Knex.Transaction;

const deleteExistingMetaData = (trx: Transaction) => {
  return MetaDataDao.deleteAll(trx);
}

export const updateMetaData = async (trx: Transaction, data: MetaDataRequestBodyType[]) => {
  await deleteExistingMetaData(trx);
  const metaDataModels = data.map(({
                                     key, value, preventDelete
                                   }): MetaDataModel => ({key, value, preventDelete}));
  return MetaDataDao.insertMany(trx, metaDataModels);
}

export const getAllMetaData = (trx: Transaction) => {
  return MetaDataDao.getAll(trx);
}
