import {Knex} from "knex";
import SkillsModel from "../../../modules/skills/SkillsModel";

const {TABLE_NAME, col} = SkillsModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.string(col("skill", false)).notNullable();
      table.decimal(col("score", false)).notNullable();
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
      table.timestamp(col("updatedAt", false));
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
