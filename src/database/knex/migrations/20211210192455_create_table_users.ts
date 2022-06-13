import {Knex} from "knex";
import UsersModel from "../../../modules/users/UsersModel";
import {getType} from "../../../core/types/randomTypes";
import {UsersType} from "../../../interfaces/modulesTypes";

const {TABLE_NAME, col} = UsersModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.string(col("firstName", false)).notNullable();
      table.string(col("lastName", false)).notNullable();
      table.string(col("email", false)).unique().notNullable();
      table.string(col("password", false)).notNullable();
      table.string(col("type", false)).defaultTo(getType<UsersType>("user"));
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
      table.timestamp(col("updatedAt", false));
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
