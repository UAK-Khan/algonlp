import ServicesModel from "./ServicesModel";
import BaseDao from "../../core/module/BaseDao";
import {Knex} from "knex";
import EntityFilesModel from "../entityFiles/EntityFilesModel";
import {PUBLIC_SERVICE_DIR_PATH} from "../../configs/appConfigs";
import Transaction = Knex.Transaction;

class ServicesDao extends BaseDao<ServicesModel> {
  constructor() {
    super(ServicesModel.TABLE_NAME);
  }

  getAllServices(trx: Transaction) {
    return trx(this.tableName)
      .select([
        ServicesModel.col("id"),
        ServicesModel.col("createdAt"),
        this.col("title"),
        this.col("status"),
        trx.raw(`
          JSON_AGG(CONCAT('${PUBLIC_SERVICE_DIR_PATH}', ??, ??)) as images
        `, [EntityFilesModel.col("id"), EntityFilesModel.col("filePath")])
      ])
      .leftJoin(EntityFilesModel.TABLE_NAME, EntityFilesModel.col("entityId"), ServicesModel.col("id"))
      .groupBy([
        ServicesModel.col("id"),
        ServicesModel.col("createdAt"),
        this.col("title"),
        this.col("status"),
      ]).orderBy(ServicesModel.col("createdAt"), "desc");
  }
}

export default new ServicesDao();
