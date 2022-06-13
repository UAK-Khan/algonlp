import BaseModel from "../../core/module/BaseModel";

class MetaDataModel extends BaseModel {
  static TABLE_NAME = "meta_data";

  constructor(
    public key: string,
    public value: string,
    public createdAt?: string,
    public preventDelete?: boolean,
    public updatedAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof MetaDataModel, prefix = true): string {
    return prefix ? `${MetaDataModel.TABLE_NAME}.${k}` : k;
  }
}

export default MetaDataModel;
