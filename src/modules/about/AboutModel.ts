import BaseModel from "../../core/module/BaseModel";

class AboutModel extends BaseModel {
  static TABLE_NAME = "about";

  constructor(
    public about: string,
    public createdAt?: string,
    public updatedAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof AboutModel, prefix = true): string {
    return prefix ? `${AboutModel.TABLE_NAME}.${k}` : k;
  }
}

export default AboutModel;
