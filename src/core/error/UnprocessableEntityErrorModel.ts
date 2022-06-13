import BaseErrorModel from "./BaseErrorModel";

class UnprocessableEntityErrorModel extends BaseErrorModel {
  constructor(message: string) {
    super(message, 422, "UnprocessableEntityError");
  }
}

export default UnprocessableEntityErrorModel;
