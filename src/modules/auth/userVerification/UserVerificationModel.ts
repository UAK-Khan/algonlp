import BaseModel from "../../../core/module/BaseModel";

class UserVerificationModel extends BaseModel {
  static TABLE_NAME = "user_verification";

  constructor(
    public userId: string,
    public verificationCode: string,
    public createdAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UserVerificationModel, prefix = true): string {
    return prefix ? `${UserVerificationModel.TABLE_NAME}.${k}` : k;
  }
}

export default UserVerificationModel;
