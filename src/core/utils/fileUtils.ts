import fs from "fs";

export const createDirSync = (dir: string): string | undefined => fs.mkdirSync(dir, {recursive: true});

export const deleteFileSync = (fullPath: string): void => {
  if (fileExistSync(fullPath)) fs.unlinkSync(fullPath);
}
export const deleteFile = (fullPath: string, cb: () => void): void => fs.unlink(fullPath, cb);
export const fileExistSync = (fullPath: string): boolean => fs.existsSync(fullPath);

export const getFileSync = (
  fullPath: string, encoding: BufferEncoding = "utf-8",
): string => fs.readFileSync(fullPath, {encoding});
export const dirExistsSync = (
  dir: string,
): boolean => fs.existsSync(dir);

export const writeFileOnDiskSync = (fullFilePath: string, fileData: Buffer): void => fs
  .writeFileSync(fullFilePath, fileData);

export const createOrReplaceFileOnDisk = (dir: string, fullFilePath: string, fileData: Buffer): void => {
  if (!dirExistsSync(dir)) createDirSync(dir);
  if (fileExistSync(fullFilePath)) deleteFileSync(fullFilePath);
  writeFileOnDiskSync(fullFilePath, fileData);
};
