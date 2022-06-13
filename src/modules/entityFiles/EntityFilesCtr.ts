import {NextFunction, Request, Response} from "express";
import {DB} from "../../core/knex/knexConfigs";
import {msgEntityFileAdded, msgEntityFileDeleted} from "../../misc/responseMessages";
import path from "path";
import {createOrReplaceFileOnDisk} from "../../core/utils/fileUtils";
import EntityFilesDao from "./EntityFilesDao";
import {SERVICE_IMG_DIR_PATH} from "../../configs/appConfigs";
import {deleteEntityFile} from "./EntityFilesSrv";

// todo: currently we are storing files in services folder later each module should have own file dir
export const pathFromRootAssetsDir = path.normalize(path.join(process.env.NODE_PATH as string, SERVICE_IMG_DIR_PATH));

const saveFile = (entityId: string, file: Express.Multer.File): string => {
  const dirFullPath = path.resolve(pathFromRootAssetsDir);
  const filePathInDir = path.join(pathFromRootAssetsDir, `${entityId}${path.extname(file.originalname)}`);
  createOrReplaceFileOnDisk(
    dirFullPath, filePathInDir, file.buffer,
  );

  return filePathInDir;
}

class EntityFilesCtr {
  static async addEntityFile(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const entityId = req.params.id;
      await DB.transaction(async (trx) => {
        const files = req.files as Express.Multer.File[];
        if (files.length) {
          await Promise.all(files.map(async (file) => {
            const fileExtension = path.extname(file.originalname);
            const [entityFile] = await EntityFilesDao.insertOne(trx, {entityId, filePath: fileExtension});
            saveFile(entityFile.id as string, file);
          }));
        }
        res.sendMsg(msgEntityFileAdded)
      });
    } catch (e) {
      next(e);
    }
  }

  static async deleteEntityFile(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const fileId = req.params.id;
      await DB.transaction(async (trx) => {
        await deleteEntityFile(trx, fileId);
        res.sendMsg(msgEntityFileDeleted)
      });
    } catch (e) {
      next(e);
    }
  }
}

export default EntityFilesCtr;
