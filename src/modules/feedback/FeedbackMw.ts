import {requiredBodyFieldVld} from "../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../core/middlewares/requestValidationResultMw";
import FeedbackModel from "./FeedbackModel";

export const vldAddFeedback = [
  requiredBodyFieldVld(FeedbackModel.col("feedback", false)),
  requiredBodyFieldVld(FeedbackModel.col("rating", false)).isInt({min: 1, max: 5}),
  validationResultMW,
];
