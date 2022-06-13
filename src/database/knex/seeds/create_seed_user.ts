import {Knex} from "knex";
import UsersModel from "../../../modules/users/UsersModel";
import {usersData} from "../../../misc/data/usersData";
import {saveUser} from "../../../modules/users/UsersSrv";

export async function seed(knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    // Deletes ALL existing entries
    await knex(UsersModel.TABLE_NAME).del();

    // Inserts seed entries
    await Promise.all(usersData.map((user) => saveUser(trx, user)));
  });
}
