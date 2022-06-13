import EntityFilesDao from "./EntityFilesDao";
import {deleteFileSync} from "../../core/utils/fileUtils";
import path from "path";
import {pathFromRootAssetsDir} from "./EntityFilesCtr";
import {Knex} from "knex";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";
import Transaction = Knex.Transaction;

export const deleteEntityFile = async (trx: Transaction, fileId: string) => {
  const file = await EntityFilesDao.findOneById(trx, fileId);
  if (file) {
    await EntityFilesDao.deleteOneById(trx, fileId);
    deleteFileSync(path.join(pathFromRootAssetsDir, `${file.id}${file.filePath}`));
  } else {
    throw new UnprocessableEntityErrorModel("The file does not exists");
  }
}
