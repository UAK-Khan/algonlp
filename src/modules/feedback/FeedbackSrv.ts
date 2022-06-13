import {Knex} from "knex";
import FeedbackDao from "./FeedbackDao";
import {FeedbackRequestBodyType} from "../../interfaces/modulesTypes";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";
import {msgFeedbackExists} from "../../misc/responseMessages";
import {isAdminUser} from "../auth/AuthMw";
import {SessionData} from "express-session";
import FeedbackModel from "./FeedbackModel";
import Transaction = Knex.Transaction;

export const addFeedback = async (trx: Transaction, userId: string, data: FeedbackRequestBodyType) => {
  const {feedback, rating} = data;
  if (!await FeedbackDao.findOneByCol(trx, "userId", userId)) {
    return FeedbackDao.insertOne(trx, {userId, feedback, rating});
  }
  throw new UnprocessableEntityErrorModel(msgFeedbackExists)
}

export const getAllFeedbacks = async (trx: Transaction, session: SessionData) => {
  if (await isAdminUser(session)) {
    return FeedbackDao.getAllFeedbacks(trx, [FeedbackModel.col("id"), "rating", FeedbackModel.col("createdAt"), "firstName", "lastName", "email", "feedback"])
  }
  return FeedbackDao.getAllFeedbacks(trx, [FeedbackModel.col("id"), "firstName", "lastName", "rating", "feedback", FeedbackModel.col("createdAt")])
}

export const getFeedback = (trx: Transaction, feedbackId: string) => {
  return FeedbackDao.findOneById(trx, feedbackId, ["feedback"])
}
