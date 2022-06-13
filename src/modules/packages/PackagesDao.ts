import BaseDao from "../../core/module/BaseDao";
import PackagesModel from "./PackagesModel";
import {Knex} from "knex";
import Transaction = Knex.Transaction;

class PackagesDao extends BaseDao<PackagesModel> {
  constructor() {
    super(PackagesModel.TABLE_NAME);
  }

  isExistingPackage(trx: Transaction, packages: PackagesModel, isAdd: boolean = true) {
    const qb = trx(this.tableName)
      .where((qb) => (
        qb.where(this.col("name"), packages.name)
          .orWhere(this.col("title"), packages.title)
      )).first();
    if (!isAdd) qb.andWhereNot(this.col("id"), packages.id);
    return qb;
  }
}

export default new PackagesDao();
