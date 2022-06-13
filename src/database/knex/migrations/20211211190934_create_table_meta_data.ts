import {Knex} from "knex";
import MetaDataModel from "../../../modules/metaData/MetaDataModel";

const {TABLE_NAME, col} = MetaDataModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.string(col("key", false)).notNullable();
      table.string(col("value", false)).nullable();
      table.boolean(col("preventDelete", false)).nullable();
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
      table.timestamp(col("updatedAt", false));
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
