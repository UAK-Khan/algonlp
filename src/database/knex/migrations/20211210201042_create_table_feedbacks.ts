import {Knex} from "knex";
import FeedbackModel from "../../../modules/feedback/FeedbackModel";
import UsersModel from "../../../modules/users/UsersModel";

const {TABLE_NAME, col} = FeedbackModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.integer(col("userId", false))
        .references(UsersModel.col("id", false)).inTable(UsersModel.TABLE_NAME).notNullable();
      table.text(col("feedback", false)).notNullable();
      table.integer(col("rating", false)).nullable();
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
