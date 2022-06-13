import BaseDao from "../../core/module/BaseDao";
import ServicePackagesModel from "./ServicePackagesModel";
import {Knex} from "knex";
import PackagesModel from "../packages/PackagesModel";
import {AllServicePackagesType} from "../../interfaces/modulesTypes";
import ServiceModel from "../services/ServicesModel";
import Transaction = Knex.Transaction;

class ServicePackagesDao extends BaseDao<ServicePackagesModel> {
  constructor() {
    super(ServicePackagesModel.TABLE_NAME);
  }

  getAllServicePackages(
    trx: Transaction, serviceId: string
  ): Knex.QueryBuilder<PackagesModel[]> {
    return trx<AllServicePackagesType>(this.tableName)
      .select([
        PackagesModel.col("id"),
        PackagesModel.col("name"),
        PackagesModel.col("title"),
        PackagesModel.col("description"),
        PackagesModel.col("price"),
        PackagesModel.col("createdAt"),
      ])
      .join(ServiceModel.TABLE_NAME, ServiceModel.col("id"), this.col("serviceId"))
      .join(PackagesModel.TABLE_NAME, PackagesModel.col("id"), this.col("packageId"))
      .where(this.col("serviceId"), serviceId);
  }
}

export default new ServicePackagesDao();
