import BaseModel from "../../core/module/BaseModel";

class EntityFilesModel extends BaseModel {
  static TABLE_NAME = "entity_files";

  constructor(
    public entityId: string,
    public filePath: string,
    public createdAt?: string,
    public updatedAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof EntityFilesModel, prefix = true): string {
    return prefix ? `${EntityFilesModel.TABLE_NAME}.${k}` : k;
  }
}

export default EntityFilesModel;
