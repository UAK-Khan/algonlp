import UserMessagesModel from "./UserMessagesModel";
import {requiredBodyFieldVld} from "../../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../../core/middlewares/requestValidationResultMw";

export const vldAddUserMessage = [
  requiredBodyFieldVld(UserMessagesModel.col("phone", false)),
  requiredBodyFieldVld(UserMessagesModel.col("message", false)),
  validationResultMW,
];
