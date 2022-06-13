import BaseDao from "../../core/module/BaseDao";
import FeedbackModel from "./FeedbackModel";
import {Knex} from "knex";
import UsersModel from "../users/UsersModel";
import Transaction = Knex.Transaction;

class FeedbackDao extends BaseDao<FeedbackModel> {
  constructor() {
    super(FeedbackModel.TABLE_NAME);
  }

  getAllFeedbacks(trx: Transaction, fields: ((keyof (UsersModel & FeedbackModel)) | string)[]) {
    return trx(this.tableName)
      .select(fields)
      .join(UsersModel.TABLE_NAME, UsersModel.col("id"), this.col("userId"))
      .orderBy(FeedbackModel.col("createdAt"), "desc")
  }
}

export default new FeedbackDao();
