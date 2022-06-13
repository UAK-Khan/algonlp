import {Knex} from "knex";
import PackagesModel from "../../../modules/packages/PackagesModel";

const {TABLE_NAME, col} = PackagesModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.string(col("name", false)).unique();
      table.string(col("title", false)).unique();
      table.decimal(col("price", false)).notNullable();
      table.text(col("description", false)).nullable();
      table.text(col("dayDelivery", false)).nullable();
      table.text(col("revisions", false)).nullable();
      table.json(col("servicesIncludes", false)).nullable();
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
      table.timestamp(col("updatedAt", false));
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

