import BaseDao from "../../core/module/BaseDao";
import UsersModel from "./UsersModel";
import {Knex} from "knex";
import Transaction = Knex.Transaction;
import UserVerificationModel from "../auth/userVerification/UserVerificationModel";

class UsersDao extends BaseDao<UsersModel> {
  constructor() {
    super(UsersModel.TABLE_NAME);
  }

  getAllUsers(trx: Transaction, fields: (keyof UsersModel)[]) {
    const verificationTbl = trx(UserVerificationModel.TABLE_NAME)
      .where(UserVerificationModel.col("userId"), trx.raw("??", UsersModel.col("id")))
      .first();
    const qb = trx(this.tableName)
      .select([
        ...fields,
        trx.raw(`
          CASE WHEN EXISTS (${verificationTbl}) THEN false ELSE TRUE END ??
        `, ["isVerified"])
      ]);
    return qb;
  }
}

export default new UsersDao();
