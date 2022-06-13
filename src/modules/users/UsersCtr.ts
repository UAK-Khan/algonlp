import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {getAllUsers, getUser} from "./UsersSrv";
import {AllUsersResponseType, UserResponseType} from "../../interfaces/modulesTypes";

class UsersCtr {

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAllUsers(trx);
        res.sendList<AllUsersResponseType>({list: data, total: data.length})
      });
    } catch (e) {
      next(e);
    }
  }

  static async getUser(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      await DB.transaction(async (trx) => {
        const data = await getUser(trx, userId);
        res.sendObject<UserResponseType>(data)
      });
    } catch (e) {
      next(e);
    }
  }
}

export default UsersCtr;
