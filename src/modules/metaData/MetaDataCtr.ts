import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {AllMetaDataResponseType, MetaDataRequestBodyType,} from "../../interfaces/modulesTypes";
import {msgMetaDataSaved} from "../../misc/responseMessages";
import {getAllMetaData, updateMetaData} from "./MetaDataSrv";

class MetaDataCtr {

  static async updateMetaData(
    req: Request<{}, {}, MetaDataRequestBodyType[]>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        await updateMetaData(trx, requestBody);
        res.sendMsg(msgMetaDataSaved)
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllMetaData(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAllMetaData(trx);
        res.sendList<AllMetaDataResponseType>({list: data, total: data.length})
      });
    } catch (e) {
      next(e);
    }
  }
}

export default MetaDataCtr;
