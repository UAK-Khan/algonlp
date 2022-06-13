import {requiredBodyFieldVld, requiredNumericIdParamVld} from "../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../core/middlewares/requestValidationResultMw";
import PackagesModel from "./PackagesModel";

export const vldAddPackage = [
  requiredBodyFieldVld(PackagesModel.col("name", false)),
  requiredBodyFieldVld(PackagesModel.col("title", false)),
  requiredBodyFieldVld(PackagesModel.col("price", false)),
  requiredBodyFieldVld(PackagesModel.col("description", false)),
  validationResultMW,
];

export const vldUpdatePackage = [
  requiredNumericIdParamVld(),
  requiredBodyFieldVld(PackagesModel.col("name", false)),
  requiredBodyFieldVld(PackagesModel.col("title", false)),
  validationResultMW,
];
