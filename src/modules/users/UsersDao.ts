import BaseDao from "../../core/module/BaseDao";
import UsersModel from "./UsersModel";

class UsersDao extends BaseDao<UsersModel> {
  constructor() {
    super(UsersModel.TABLE_NAME);
  }
}

export default new UsersDao();
