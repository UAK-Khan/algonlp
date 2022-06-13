import BaseModel from "../../../core/module/BaseModel";

class UserMessagesModel extends BaseModel {
  static TABLE_NAME = "user_messages";

  constructor(
    public phone: string,
    public message: string,
    public userId: string,
    public createdAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UserMessagesModel, prefix = true): string {
    return prefix ? `${UserMessagesModel.TABLE_NAME}.${k}` : k;
  }
}

export default UserMessagesModel;
