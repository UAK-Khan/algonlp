import BaseDao from "../../core/module/BaseDao";
import {Knex} from "knex";
import MetaDataModel from "./MetaDataModel";
import Transaction = Knex.Transaction;

class MetaDataDao extends BaseDao<MetaDataModel> {
  constructor() {
    super(MetaDataModel.TABLE_NAME);
  }

  deleteAll(trx: Transaction) {
    return trx(this.tableName).del();
  }
}

export default new MetaDataDao();
