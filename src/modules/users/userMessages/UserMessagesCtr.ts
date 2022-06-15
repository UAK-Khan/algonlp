import {NextFunction, Request, Response} from "express";
import {
  AllUserMessagesResponseType,
  UserMessagesRequestBodyType,
  UserMessagesResponseType
} from "../../../interfaces/modulesTypes";
import {DB} from "../../../core/knex/knexConfigs";
import {addUserMessage, getAllUserMessages, getUserMessageDetails} from "./UserMessagesSrv";
import {getUserSession} from "../../../core/utils/sessionUtils";
import {msgMessageSaved} from "../../../misc/responseMessages";

class UserMessagesCtr {

  static async addUserMessage(req: Request<{}, {}, UserMessagesRequestBodyType>, res: Response, next: NextFunction) {
    try {
      const reqBody = req.body;
      const user = getUserSession(req);
      await DB.transaction(async (trx) => {
        const data = await addUserMessage(trx, user.id, reqBody);
        res.sendMsg(msgMessageSaved);
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllUserMessages(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAllUserMessages(trx);
        res.sendList<AllUserMessagesResponseType>({list: data, total: data.length})
      });
    } catch (e) {
      next(e);
    }
  }

  static async getUserMessageDetails(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const userMessageId = req.params.id;
      await DB.transaction(async (trx) => {
        const data = await getUserMessageDetails(trx, userMessageId);
        res.sendObject<UserMessagesResponseType>(data)
      });
    } catch (e) {
      next(e);
    }
  }
}

export default UserMessagesCtr;
