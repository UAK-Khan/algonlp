import {NextFunction, Request, Response} from "express";
import {codeSuccess} from "../../misc/responseCode";

export const requestMethodsExtension = (_req: Request, res: Response, next: NextFunction) => {
  res.sendList = (data: any, message?: string) => {
    res.status(codeSuccess).json({
      ...data,
      message,
    });
  };
  res.sendObject = (data: any, message?: string) => {
    res.status(codeSuccess).json({
      data,
      message,
    });
  };
  res.sendMsg = (message: string) => {
    res.status(codeSuccess).json({message});
  };
  res.sendString = (str: string) => res.status(codeSuccess).send(str);
  next();
}
