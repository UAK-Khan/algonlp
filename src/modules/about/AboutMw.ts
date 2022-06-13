import {requiredBodyFieldVld} from "../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../core/middlewares/requestValidationResultMw";
import AboutModel from "./AboutModel";

export const vldUpdateAboutDetails = [
  requiredBodyFieldVld(AboutModel.col("about", false)),
  validationResultMW,
];
