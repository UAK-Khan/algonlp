import {Request} from "express";
import UnprocessableEntityErrorModel from "../error/UnprocessableEntityErrorModel";
import {UserSessionType} from "../../interfaces/modulesTypes";
import {msgSessionNotExists} from "../../misc/systemMessages";

export const getUserSession = (req: Request): UserSessionType => {
  if (req?.session?.user) {
    return req.session.user;
  }

  throw new UnprocessableEntityErrorModel(msgSessionNotExists);
};

export const saveSession = (
  req: Request,
  sessionData: UserSessionType,
) => {
  req.session.user = sessionData;
}

export const destroySession = (req: Request, cb?: (err: Error | null) => void) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) throw new UnprocessableEntityErrorModel(err);
      if (cb) cb(err);
    });
  } else if (cb) cb(null);
}
