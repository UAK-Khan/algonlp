import {body, param, ValidationChain} from "express-validator";

export const requiredBodyFieldVld = (column: string, alias?: string): ValidationChain => body(column, `The ${alias || column} is required`)
  .trim()
  .exists({
    checkFalsy: true,
    checkNull: true,
  })
  .bail();

export const requiredNumericIdParamVld = (): ValidationChain => param("id", "The id is invalid")
  .exists().isNumeric().bail();
