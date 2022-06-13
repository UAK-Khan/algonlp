import MessageModel from "../error/MessageModel";
import BaseErrorModel from "../error/BaseErrorModel";
import {Errback, NextFunction, Request, Response} from "express";
import {msgServerError} from "../../misc/systemMessages";

export const errorHandler = (err: Errback, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  if ("getErrorCode" in err) {
    const e = err as unknown as BaseErrorModel;
    res.status(e.getErrorCode()).json(new MessageModel(e.getErrorMessage()));
  } else {
    res.status(422).json(new MessageModel(msgServerError));
  }
}
