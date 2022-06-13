import {Knex} from "knex";
import PackagesModel from "../../../modules/packages/PackagesModel";
import ServicePackagesModel from "../../../modules/servicePackages/ServicePackagesModel";
import ServicesModel from "../../../modules/services/ServicesModel";

const {TABLE_NAME, col} = ServicePackagesModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.integer(col("serviceId", false)).references(ServicesModel.col("id", false)).inTable(ServicesModel.TABLE_NAME);
      table.integer(col("packageId", false)).references(PackagesModel.col("id", false)).inTable(PackagesModel.TABLE_NAME);
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
      table.timestamp(col("updatedAt", false));

      table.unique([col("serviceId", false), col("packageId", false)]);
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

