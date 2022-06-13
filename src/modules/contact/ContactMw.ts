import {requiredBodyFieldVld} from "../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../core/middlewares/requestValidationResultMw";
import ContactModel from "./ContactModel";

export const vldSaveContact = [
  requiredBodyFieldVld(ContactModel.col("email", false)),
  requiredBodyFieldVld(ContactModel.col("phone", false)),
  requiredBodyFieldVld(ContactModel.col("name", false)),
  requiredBodyFieldVld(ContactModel.col("message", false)),
  validationResultMW,
];
