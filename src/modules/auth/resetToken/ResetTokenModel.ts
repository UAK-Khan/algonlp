import BaseModel from "../../../core/module/BaseModel";

class ResetTokenModel extends BaseModel {
  static TABLE_NAME = "reset_token";

  constructor(
    public userId: string,
    public token: string,
    public expiryInMilliseconds: number,
    public createdAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof ResetTokenModel, prefix = true): string {
    return prefix ? `${ResetTokenModel.TABLE_NAME}.${k}` : k;
  }
}

export default ResetTokenModel;
