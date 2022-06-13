import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {AllPackagesResponseType, PackageRequestBodyType, PackageResponseType,} from "../../interfaces/modulesTypes";
import {msgPackageAdded, msgPackageDeleted, msgPackageUpdated} from "../../misc/responseMessages";
import {addPackage, deletePackage, getAllPackages, getPackage, updatePackage} from "./PackagesSrv";

class PackagesCtr {

  static async addPackage(
    req: Request<{}, {}, PackageRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        await addPackage(trx, requestBody);
        res.sendMsg(msgPackageAdded)
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAllPackages(req: Request, res: Response, next: NextFunction) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAllPackages(trx);
        res.sendList<AllPackagesResponseType>({list: data, total: data.length})
      });
    } catch (e) {
      next(e);
    }
  }

  static async getPackage(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const packageId = req.params.id;
      await DB.transaction(async (trx) => {
        const data = await getPackage(trx, packageId);
        res.sendObject<PackageResponseType>(data)
      });
    } catch (e) {
      next(e);
    }
  }

  static async updatePackage(req: Request<{ id: string }, PackageRequestBodyType>, res: Response, next: NextFunction) {
    try {
      const packageId = req.params.id;
      const requestBody = req.body;
      await DB.transaction(async (trx) => {
        await updatePackage(trx, packageId, requestBody);
        res.sendMsg(msgPackageUpdated)
      });
    } catch (e) {
      next(e);
    }
  }

  static async deletePackage(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const packageId = req.params.id;
      await DB.transaction(async (trx) => {
        await deletePackage(trx, packageId);
        res.sendMsg(msgPackageDeleted);
      });
    } catch (e) {
      next(e);
    }
  }
}

export default PackagesCtr;
