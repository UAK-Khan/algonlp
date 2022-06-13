import {Knex} from "knex";
import EntityFilesModel from "../../../modules/entityFiles/EntityFilesModel";

const {TABLE_NAME, col} = EntityFilesModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.integer(col("entityId", false));
      table.string(col("filePath", false)).notNullable();
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
      table.timestamp(col("updatedAt", false));
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}

