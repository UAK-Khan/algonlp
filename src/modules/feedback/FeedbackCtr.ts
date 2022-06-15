import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {AllFeedbacksResponseType, FeedbackRequestBodyType, FeedbackResponseType,} from "../../interfaces/modulesTypes";
import {addFeedback, getAllFeedbacks, getFeedback} from "./FeedbackSrv";
import {msgFeedbackSubmit} from "../../misc/responseMessages";
import {getUserSession} from "../../core/utils/sessionUtils";
import {SessionData} from "express-session";

class FeedbackCtr {

  static async addFeedback(
    req: Request<{}, {}, FeedbackRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      const user = getUserSession(req);
      await DB.transaction(async (trx) => {
        await addFeedback(trx, user.id, requestBody);
        res.sendMsg(msgFeedbackSubmit)
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllFeedbacks(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAllFeedbacks(trx, req.session as SessionData);
        res.sendList<AllFeedbacksResponseType>({list: data, total: data.length})
      });
    } catch (e) {
      next(e);
    }
  }

  static async getFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const feedbackId = req.params.id;
      await DB.transaction(async (trx) => {
        const data = await getFeedback(trx, feedbackId);
        res.sendObject<FeedbackResponseType>(data);
      });
    } catch (e) {
      next(e);
    }
  }
}

export default FeedbackCtr;
