import BaseModel from "../../core/module/BaseModel";

class ServicePackagesModel extends BaseModel {
  static TABLE_NAME = "service_packages";

  constructor(
    public serviceId: string,
    public packageId: string,
    public createdAt?: string,
    public updatedAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof ServicePackagesModel, prefix = true): string {
    return prefix ? `${ServicePackagesModel.TABLE_NAME}.${k}` : k;
  }
}

export default ServicePackagesModel;
