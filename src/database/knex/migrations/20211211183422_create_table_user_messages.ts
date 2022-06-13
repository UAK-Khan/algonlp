import {Knex} from "knex";
import UserMessagesModel from "../../../modules/users/userMessages/UserMessagesModel";
import UsersModel from "../../../modules/users/UsersModel";

const {TABLE_NAME, col} = UserMessagesModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.integer(col("userId", false)).references(UsersModel.col("id", false)).inTable(UsersModel.TABLE_NAME);
      table.string(col("phone", false)).notNullable();
      table.text(col("message", false)).notNullable();
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
