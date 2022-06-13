import {NextFunction, Request, Response} from "express";
import {AllContactsResponseType, ContactRequestBodyType} from "../../interfaces/modulesTypes";
import {DB} from "../../core/knex/knexConfigs";
import {getAllContacts, saveContactUsDetails} from "./ContactSrv";
import {msgContactUsDetailsSaved} from "../../misc/responseMessages";

class ContactCtr {
  static async getAllContacts(
    req: Request<{}, {}, ContactRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await DB.transaction(async (trx) => {
        const data = await getAllContacts(trx);
        res.sendList<AllContactsResponseType>({list: data, total: data.length})
      });
    } catch (e) {
      next(e);
    }
  }

  static async saveContact(
    req: Request<{}, {}, ContactRequestBodyType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      await DB.transaction(async (trx) => {
        await saveContactUsDetails(trx, req.body);
        res.sendMsg(msgContactUsDetailsSaved)
      });
    } catch (e) {
      next(e);
    }
  }
}

export default ContactCtr;
