import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {msgAboutDetailsUpdated,} from "../../misc/responseMessages";
import {AboutDetailsResponseType, AboutRequestBodyType} from "../../interfaces/modulesTypes";
import {getAboutDetails, updateAboutDetails} from "./AboutSrv";

class AboutCtr {

  static async updateAboutDetails(
    req: Request<{}, {}, AboutRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        await updateAboutDetails(trx, requestBody);
        res.sendMsg(msgAboutDetailsUpdated)
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAboutDetails(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAboutDetails(trx);
        res.sendObject<AboutDetailsResponseType>(data);
      });
    } catch (e) {
      next(e);
    }
  }
}

export default AboutCtr;
