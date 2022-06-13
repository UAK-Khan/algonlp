import ServiceModel from "./ServicesModel";
import {requiredBodyFieldVld, requiredNumericIdParamVld} from "../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../core/middlewares/requestValidationResultMw";

export const vldAddService = [
  requiredBodyFieldVld(ServiceModel.col("title", false)),
  requiredBodyFieldVld(ServiceModel.col("description", false)),
  requiredBodyFieldVld(ServiceModel.col("status", false)),
  validationResultMW,
];

export const vldUpdateService = [
  requiredNumericIdParamVld(),
  requiredBodyFieldVld(ServiceModel.col("title", false)),
  validationResultMW,
];
