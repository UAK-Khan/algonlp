import ServiceModel from "../modules/services/ServicesModel";
import PackagesModel from "../modules/packages/PackagesModel";
import UsersModel from "../modules/users/UsersModel";
import FeedbackModel from "../modules/feedback/FeedbackModel";
import AboutModel from "../modules/about/AboutModel";
import SkillsModel from "../modules/skills/SkillsModel";
import UserMessagesModel from "../modules/users/userMessages/UserMessagesModel";
import MetaDataModel from "../modules/metaData/MetaDataModel";
import EntityFilesModel from "../modules/entityFiles/EntityFilesModel";
import ContactModel from "../modules/contact/ContactModel";

export type UsersType = "admin" | "user";

export type UserSessionType = Required<Pick<UsersModel, "id" | "firstName" | "lastName" | "email" | "type">>;

export type ServiceRequestBodyType = Pick<ServiceModel, "title" | "description" | "status">
  & { packages: string[] };
export type AllServiceResponseType = Pick<ServiceModel, "id" | "title" | "status" | "createdAt" | "updatedAt">;
export type ServiceResponseType = AllServiceResponseType & Pick<ServiceModel, "description">
  & { packages: string[], images: Pick<EntityFilesModel, "id">[], imagesLinks?: string[] };

export type PackageRequestBodyType = Pick<PackagesModel, "name" | "title" | "price" | "description" | "dayDelivery" | "revisions" | "servicesIncludes">;
export type AllPackagesResponseType = Pick<PackagesModel, "id" | "name" | "title" | "price" | "createdAt" | "updatedAt">;
export type PackageResponseType = AllPackagesResponseType & Pick<PackagesModel, "description">;
export type AllServicePackagesType = Pick<PackagesModel, "id" | "name" | "title">;

export type UserRequestBodyType = Pick<UsersModel, "firstName" | "lastName" | "email" | "password">;
export type AllUsersResponseType = Omit<UsersModel, "password">;
export type UserResponseType = AllUsersResponseType;

export type FeedbackRequestBodyType = Pick<FeedbackModel, "feedback" | "rating">;
export type AllFeedbacksResponseType = Pick<FeedbackModel, "id" | "rating" | "createdAt">;
export type FeedbackResponseType = Pick<FeedbackModel, "feedback">;

export type AboutRequestBodyType = Pick<AboutModel, "about">;
export type AboutDetailsResponseType = AboutModel;

export type SkillsRequestBodyType = Pick<SkillsModel, "skill" | "score">;
export type AllSkillsResponseType = Pick<SkillsModel, "id" | "skill" | "score">;

export type UserMessagesRequestBodyType = Pick<UserMessagesModel, "phone" | "message">;
export type AllUserMessagesResponseType = Pick<UserMessagesModel
  & UsersModel, "id" | "phone" | "createdAt" | "email" | "firstName" | "lastName">;
export type UserMessagesResponseType = Pick<UserMessagesModel, "message">;

export type MetaDataRequestBodyType = MetaDataModel;
export type AllMetaDataResponseType = MetaDataModel;

export type AuthChangePasswordRequestBodyType = {
  newPassword: string,
};

export type AuthForgotPasswordRequestBodyType = {
  email: string,
};

export type ContactRequestBodyType = Omit<ContactModel, "id" | "createdAt">;
export type AllContactsResponseType = ContactModel;

