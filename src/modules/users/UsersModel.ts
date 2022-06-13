import BaseModel from "../../core/module/BaseModel";
import {UsersType} from "../../interfaces/modulesTypes";

class UsersModel extends BaseModel {
  static TABLE_NAME = "users";

  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public type: UsersType,
    public createdAt?: string,
    public updatedAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof UsersModel, prefix = true): string {
    return prefix ? `${UsersModel.TABLE_NAME}.${k}` : k;
  }
}

export default UsersModel;
