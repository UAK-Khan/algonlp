import {Knex} from "knex";
import ServicesModel from "../../../modules/services/ServicesModel";

const {TABLE_NAME, col} = ServicesModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.string(col("title", false)).unique();
      table.text(col("description", false)).nullable();
      table.boolean(col("status", false)).defaultTo(true);
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
      table.timestamp(col("updatedAt", false));
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

