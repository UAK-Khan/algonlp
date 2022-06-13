import BaseModel from "../../core/module/BaseModel";

class ContactModel extends BaseModel {
  static TABLE_NAME = "contact_us";

  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public message: string,
    public createdAt?: string,
    public id?: string,
  ) {
    super(id);
  }

  static col(k: keyof ContactModel, prefix = true): string {
    return prefix ? `${ContactModel.TABLE_NAME}.${k}` : k;
  }
}

export default ContactModel;
