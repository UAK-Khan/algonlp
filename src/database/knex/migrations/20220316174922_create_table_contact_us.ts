import {Knex} from "knex";
import ContactModel from "../../../modules/contact/ContactModel";

const {TABLE_NAME, col} = ContactModel;

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments(col("id", false)).primary();
      table.string(col("name", false));
      table.string(col("email", false));
      table.string(col("phone", false));
      table.text(col("message", false));
      table.timestamp(col("createdAt", false)).defaultTo(knex.fn.now());
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
