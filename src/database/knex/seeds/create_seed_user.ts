import {Knex} from "knex";
import {usersData} from "../../../misc/data/usersData";
import {addUser, saveUser} from "../../../modules/users/UsersSrv";

export async function seed(knex: Knex): Promise<void> {
  return knex.transaction(async (trx) => {
    await Promise.all(usersData.map(async (user) => {
      try {
        await addUser(trx, user)
      } catch (err) {}
    }));
  });
}
