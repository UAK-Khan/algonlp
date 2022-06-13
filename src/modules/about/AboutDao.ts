import BaseDao from "../../core/module/BaseDao";
import AboutModel from "./AboutModel";
import {Knex} from "knex";
import Transaction = Knex.Transaction;

class AboutDao extends BaseDao<AboutModel> {
  constructor() {
    super(AboutModel.TABLE_NAME);
  }

  getFirstRow(trx: Transaction): Promise<AboutModel> {
    return trx(this.tableName).first();
  }
}

export default new AboutDao();
