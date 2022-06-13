import BaseModel from "../../core/module/BaseModel";

class FeedbackModel extends BaseModel {
  static TABLE_NAME = "feedbacks";

  constructor(
    public rating: number,
    public feedback: string,
    public userId: string,
    public createdAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof FeedbackModel, prefix = true): string {
    return prefix ? `${FeedbackModel.TABLE_NAME}.${k}` : k;
  }
}

export default FeedbackModel;
