import UserMessagesModel from "./UserMessagesModel";
import BaseDao from "../../../core/module/BaseDao";
import {Knex} from "knex";
import UsersModel from "../UsersModel";
import {AllUserMessagesResponseType} from "../../../interfaces/modulesTypes";
import Transaction = Knex.Transaction;

class UserMessagesDao extends BaseDao<UserMessagesModel> {
  constructor() {
    super(UserMessagesModel.TABLE_NAME);
  }

  getAllUserMessages(trx: Transaction) {
    return trx<AllUserMessagesResponseType>(this.tableName)
      .select([UserMessagesModel.col("id"), "phone", "email", "firstName", "lastName", UserMessagesModel.col("createdAt")])
      .join(UsersModel.TABLE_NAME, UsersModel.col("id"), this.col("userId"));
  }
}

export default new UserMessagesDao();
