import {Knex} from "knex";
import MetaDataDao from "./MetaDataDao";
import {MetaDataRequestBodyType} from "../../interfaces/modulesTypes";
import MetaDataModel from "./MetaDataModel";
import Transaction = Knex.Transaction;
import {hasDuplicates} from "../../core/utils/stringUtils";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";

const deleteExistingMetaData = (trx: Transaction) => {
  return MetaDataDao.deleteAll(trx);
}

export const updateMetaData = async (trx: Transaction, data: MetaDataRequestBodyType[]) => {
  if (hasDuplicates(data.map((d) => d.key))) {
    throw new UnprocessableEntityErrorModel("Duplicate keys provided");
  }
  await deleteExistingMetaData(trx);
  const metaDataModels = data.map(({
    key, value, preventDelete
  }): MetaDataModel => ({key, value, preventDelete}));
  return MetaDataDao.insertMany(trx, metaDataModels);
}

export const getAllMetaData = (trx: Transaction) => {
  return MetaDataDao.getAll(trx);
}
