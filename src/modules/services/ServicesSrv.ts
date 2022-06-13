import {AllServiceResponseType, ServiceRequestBodyType, ServiceResponseType} from "../../interfaces/modulesTypes";
import {Knex} from "knex";
import ServicesDao from "./ServicesDao";
import UnprocessableEntityErrorModel from "../../core/error/UnprocessableEntityErrorModel";
import {msgServiceAlreadyExists, msgServiceNotExists} from "../../misc/responseMessages";
import {
  addOrUpdateServicePackages,
  deleteServicePackages,
  getAllServicePackages
} from "../servicePackages/ServicePackgesSrv";
import EntityFilesDao from "../entityFiles/EntityFilesDao";
import {SessionData} from "express-session";
import {PUBLIC_SERVICE_DIR_PATH} from "../../configs/appConfigs";
import {deleteEntityFile} from "../entityFiles/EntityFilesSrv";
import Transaction = Knex.Transaction;

const findServiceOrThrowException = async (trx: Transaction, serviceId: string) => {
  const service = await ServicesDao.findOneByCol(trx, "id", serviceId);
  if (!service) throw new UnprocessableEntityErrorModel(msgServiceNotExists);
  return service;
}

export const addService = async (trx: Transaction, data: ServiceRequestBodyType) => {
  const {title, description, status, packages} = data;
  const service = await ServicesDao.findOneByCol(trx, "title", title);
  if (service) throw new UnprocessableEntityErrorModel(msgServiceAlreadyExists);
  const [newService] = await ServicesDao.insertOne(trx, {title, description, status});
  if (newService?.id && packages?.length) {
    await addOrUpdateServicePackages(trx, newService.id, packages);
  }
  return newService;
}

export const getAllServices = (trx: Transaction): Promise<AllServiceResponseType[]> => {
  return ServicesDao.getAllServices(trx);
}

export const getService = async (
  trx: Transaction, serviceId: string, session: SessionData
): Promise<ServiceResponseType> => {
  const serviceDetails = await findServiceOrThrowException(trx, serviceId);
  const servicePackages = await getAllServicePackages(trx, serviceId);
  const packageIds = servicePackages.map((pkg) => pkg.id as string);
  const serviceImages = await EntityFilesDao.getAllEntityFiles(trx, serviceId);
  const serviceImagesLinks = serviceImages.map((entityImage) => `${PUBLIC_SERVICE_DIR_PATH}${entityImage.id}${entityImage.filePath}`);
  return {...serviceDetails, packages: packageIds, images: serviceImages, imagesLinks: serviceImagesLinks};
}

export const updateService = async (
  trx: Transaction, serviceId: string, updatedData: ServiceRequestBodyType,
): Promise<void> => {
  const service = await findServiceOrThrowException(trx, serviceId);
  const {title, description, status, packages} = updatedData;
  const isExistingService = await ServicesDao.findOneByCol(trx, "title", title);
  if (isExistingService && isExistingService.id !== service.id) throw new UnprocessableEntityErrorModel(msgServiceAlreadyExists);
  await ServicesDao.updateOneById(trx, {title, description, status}, serviceId);
  if (serviceId && packages?.length) {
    await addOrUpdateServicePackages(trx, serviceId, packages, false);
  }
}

export const deleteService = async (trx: Transaction, serviceId: string): Promise<void> => {
  await findServiceOrThrowException(trx, serviceId);
  await deleteServicePackages(trx, serviceId);
  await ServicesDao.deleteOneById(trx, serviceId);

  const imageIds = await EntityFilesDao.findAllByPredicatePickField(trx, {entityId: serviceId}, "id");
  await Promise.all(imageIds.map((imageId) => deleteEntityFile(trx, imageId)));
}
