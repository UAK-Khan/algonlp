import BaseModel from "../../core/module/BaseModel";

class PackagesModel extends BaseModel {
  static TABLE_NAME = "packages";

  constructor(
    public name: string,
    public title: string,
    public price: boolean,
    public description: string,
    public dayDelivery: string,
    public revisions: string,
    public servicesIncludes: string[],
    public createdAt?: string,
    public updatedAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof PackagesModel, prefix = true): string {
    return prefix ? `${PackagesModel.TABLE_NAME}.${k}` : k;
  }
}

export default PackagesModel;
