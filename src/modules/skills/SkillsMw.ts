import {requiredBodyFieldVld} from "../../core/utils/expressValidationUtils";
import {validationResultMW} from "../../core/middlewares/requestValidationResultMw";
import SkillsModel from "./SkillsModel";

export const vldUpdateSkills = [
  requiredBodyFieldVld(`*.${SkillsModel.col("skill", false)}`),
  requiredBodyFieldVld(`*.${SkillsModel.col("score", false)}`).isNumeric(),
  validationResultMW,
];
