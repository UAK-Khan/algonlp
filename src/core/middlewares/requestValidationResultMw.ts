import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const validationResultMW = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  const firstError = errors.array({onlyFirstError: true});
  if (!errors.isEmpty()) {
    res.status(422)
      .json({message: firstError[0].msg});
  } else {
    next();
  }
};
