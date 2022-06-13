import ResetTokenModel from "./ResetTokenModel";
import BaseDao from "../../../core/module/BaseDao";

class ResetTokenDao extends BaseDao<ResetTokenModel> {
  constructor() {
    super(ResetTokenModel.TABLE_NAME);
  }
}

export default new ResetTokenDao();
