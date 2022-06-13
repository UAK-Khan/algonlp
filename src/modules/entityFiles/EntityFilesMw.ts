import {requiredNumericIdParamVld} from "../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../core/middlewares/requestValidationResultMw";

export const vldUpdateEntityFile = [
  requiredNumericIdParamVld(),
  validationResultMW,
];
