import BaseDao from "../../core/module/BaseDao";
import EntityFilesModel from "./EntityFilesModel";
import {Knex} from "knex";
import Transaction = Knex.Transaction;

class EntityFilesDao extends BaseDao<EntityFilesModel> {
  constructor() {
    super(EntityFilesModel.TABLE_NAME);
  }

  getAllEntityFiles(trx: Transaction, entityId: string) {
    return this.findAllByCol(trx, "entityId", entityId, ["id", "filePath"]);
  }
}

export default new EntityFilesDao();
