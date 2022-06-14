import {Knex} from "knex";
import UserVerificationModel from "../../../modules/auth/userVerification/UserVerificationModel";
import UsersModel from "../../../modules/users/UsersModel";

const {TABLE_NAME, col} = UserVerificationModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.integer(col("userId", false)).references(UsersModel.col("id", false)).inTable(UsersModel.TABLE_NAME);
      table.string(col("verificationCode", false)).notNullable();
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());

      table.unique([col("userId", false), col("verificationCode", false)]);
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
