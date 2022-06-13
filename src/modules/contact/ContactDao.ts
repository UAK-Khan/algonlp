import BaseDao from "../../core/module/BaseDao";
import ContactModel from "./ContactModel";

class ContactDao extends BaseDao<ContactModel> {
  constructor() {
    super(ContactModel.TABLE_NAME);
  }
}

export default new ContactDao();
