import BaseDao from "../../core/module/BaseDao";
import SkillsModel from "./SkillsModel";
import {Knex} from "knex";
import Transaction = Knex.Transaction;

class SkillsDao extends BaseDao<SkillsModel> {
  constructor() {
    super(SkillsModel.TABLE_NAME);
  }

  deleteAllSkills(trx: Transaction) {
    return trx(this.tableName).del();
  }
}

export default new SkillsDao();
