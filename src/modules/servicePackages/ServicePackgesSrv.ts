import ServicePackagesDao from "./ServicePackagesDao";
import ServicePackagesModel from "./ServicePackagesModel";
import {Knex} from "knex";
import PackagesModel from "../packages/PackagesModel";
import Transaction = Knex.Transaction;

export const deleteServicePackages = (trx: Transaction, serviceId: string) => {
  return ServicePackagesDao.deleteManyByCol(trx, "serviceId", serviceId);
}

export const addOrUpdateServicePackages = async (trx: Transaction, serviceId: string, packages: string[], isAdd = true) => {
  if (!isAdd) await deleteServicePackages(trx, serviceId);
  const servicePackagesModels = packages.map((packageId): ServicePackagesModel => ({serviceId, packageId}));
  if (servicePackagesModels.length) await ServicePackagesDao.insertMany(trx, servicePackagesModels);
}

export const getAllServicePackages = async (trx: Transaction, serviceId: string): Promise<PackagesModel[]> => {
  return ServicePackagesDao.getAllServicePackages(trx, serviceId);
}
