import {AllPackagesResponseType, PackageRequestBodyType, PackageResponseType,} from "../../interfaces/modulesTypes";
import {Knex} from "knex";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";
import {msgCannotDeletePackage, msgPackageAlreadyExists, msgPackageNotExists} from "../../misc/responseMessages";
import PackagesDao from "./PackagesDao";
import Transaction = Knex.Transaction;

const findPackageOrThrowException = async (trx: Transaction, packageId: string) => {
  const packages = await PackagesDao.findOneByCol(trx, "id", packageId);
  if (!packages) throw new UnprocessableEntityErrorModel(msgPackageNotExists);
  return packages;
}

export const addPackage = async (trx: Transaction, data: PackageRequestBodyType) => {
  const {title, description, name, price, dayDelivery, revisions, servicesIncludes} = data;
  const isExistingPackage = await PackagesDao.isExistingPackage(trx, data);
  if (isExistingPackage) throw new UnprocessableEntityErrorModel(msgPackageAlreadyExists);
  await PackagesDao.insertOne(trx, {
    title,
    description,
    name,
    price,
    dayDelivery,
    revisions,
    servicesIncludes: JSON.stringify(servicesIncludes) as any
  });
}

export const getAllPackages = (trx: Transaction): Promise<AllPackagesResponseType[]> => {
  return PackagesDao.getAll(trx, ["id", "title", "name", "price", "servicesIncludes", "createdAt", "updatedAt"]);
}

export const getPackage = async (trx: Transaction, packageId: string): Promise<PackageResponseType> => {
  return await findPackageOrThrowException(trx, packageId);
}

export const updatePackage = async (
  trx: Transaction, packageId: string, updatedData: PackageRequestBodyType
): Promise<void> => {
  const packages = await findPackageOrThrowException(trx, packageId);
  const {title, description, name, price, dayDelivery, revisions, servicesIncludes} = updatedData;
  const isExistingPackage = await PackagesDao.isExistingPackage(trx, {...updatedData, id: packageId}, false);
  if (isExistingPackage) throw new UnprocessableEntityErrorModel(msgPackageAlreadyExists);
  await PackagesDao.updateOneById(trx, {
    title,
    description,
    name,
    price,
    dayDelivery,
    revisions,
    servicesIncludes: JSON.stringify(servicesIncludes) as any
  }, packageId);
}

export const deletePackage = async (trx: Transaction, packageId: string): Promise<void> => {
  await findPackageOrThrowException(trx, packageId);
  try {
    await PackagesDao.deleteOneById(trx, packageId);
  } catch (err) {
    throw new UnprocessableEntityErrorModel(msgCannotDeletePackage);
  }
}
