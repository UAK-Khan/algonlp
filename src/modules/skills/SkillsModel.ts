import BaseModel from "../../core/module/BaseModel";

class SkillsModel extends BaseModel {
  static TABLE_NAME = "skills";

  constructor(
    public skill: string,
    public score: string,
    public createdAt?: string,
    public updatedAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof SkillsModel, prefix = true): string {
    return prefix ? `${SkillsModel.TABLE_NAME}.${k}` : k;
  }
}

export default SkillsModel;
