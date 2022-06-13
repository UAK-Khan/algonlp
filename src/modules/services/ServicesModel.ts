import BaseModel from "../../core/module/BaseModel";

class ServiceModel extends BaseModel {
  static TABLE_NAME = "services";

  constructor(
    public title: string,
    public description: string,
    public status: boolean,
    public createdAt?: string,
    public updatedAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof ServiceModel, prefix = true): string {
    return prefix ? `${ServiceModel.TABLE_NAME}.${k}` : k;
  }
}

export default ServiceModel;
