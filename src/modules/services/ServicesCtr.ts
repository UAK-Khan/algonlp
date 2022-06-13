import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {AllServiceResponseType, ServiceRequestBodyType, ServiceResponseType} from "../../interfaces/modulesTypes";
import {addService, deleteService, getAllServices, getService, updateService} from "./ServicesSrv";
import {msgServiceAdded, msgServiceDeleted, msgServiceUpdated} from "../../misc/responseMessages";
import {SessionData} from "express-session";

class ServicesCtr {

  static async addService(
    req: Request<{}, {}, ServiceRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        const service = await addService(trx, requestBody);
        res.sendObject(service, msgServiceAdded)
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllServices(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAllServices(trx);
        res.sendList<AllServiceResponseType>({list: data, total: data.length})
      });
    } catch (e) {
      next(e);
    }
  }

  static async getService(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const serviceId = req.params.id;
      await DB.transaction(async (trx) => {
        const data = await getService(trx, serviceId, req.session as SessionData);
        res.sendObject<ServiceResponseType>(data)
      });
    } catch (e) {
      next(e);
    }
  }

  static async updateService(req: Request<{ id: string }, ServiceRequestBodyType>, res: Response, next: NextFunction) {
    try {
      const serviceId = req.params.id;
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        await updateService(trx, serviceId, requestBody);
        res.sendMsg(msgServiceUpdated)
      });
    } catch (e) {
      next(e);
    }
  }

  static async deleteService(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const serviceId = req.params.id;
      await DB.transaction(async (trx) => {
        await deleteService(trx, serviceId);
        res.sendMsg(msgServiceDeleted);
      });
    } catch (e) {
      next(e);
    }
  }
}

export default ServicesCtr;
