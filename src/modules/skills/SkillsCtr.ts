import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {AllSkillsResponseType, SkillsRequestBodyType} from "../../interfaces/modulesTypes";
import {getAllSkills, updateSkills} from "./SkillsSrv";
import {msgSkillsUpdated} from "../../misc/responseMessages";

class SkillsCtr {

  static async updateSkills(
    req: Request<{}, {}, SkillsRequestBodyType[]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        await updateSkills(trx, requestBody);
        res.sendMsg(msgSkillsUpdated)
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllSkills(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAllSkills(trx);
        res.sendList<AllSkillsResponseType[]>({list: data, total: data.length})
      });
    } catch (e) {
      next(e);
    }
  }
}

export default SkillsCtr;
