import BaseDao from "../../../core/module/BaseDao";
import UserVerificationModel from "./UserVerificationModel";

class UserVerificationDao extends BaseDao<UserVerificationModel> {
  constructor() {
    super(UserVerificationModel.TABLE_NAME);
  }
}

export default new UserVerificationDao();
