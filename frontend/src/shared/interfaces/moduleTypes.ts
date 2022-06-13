import {DefaultResponseType, ListResponseType} from "./ajaxTypes";

// metadata
export type MetaDataRequestBodyType = {
  key: string,
  value: string,
  createdAt: string,
  preventDelete: boolean,
  updatedAt: string,
  id: string,
};
export type AllMetaDataResponseType = ListResponseType<MetaDataRequestBodyType>;

// packages
export type PackageRequestBodyType = {
  name: string,
  title: string,
  price: string,
  description: string,
  dayDelivery: string,
  revisions: string,
};
export type AllPackagesResponseType = ListResponseType<{
  id: string,
  name: string,
  title: string,
  price: string,
  createdAt: string,
  updatedAt: string,
}>;
export type PackageResponseType = DefaultResponseType<{
  id: string,
  name: string,
  title: string,
  description: string,
  price: string,
  createdAt: string,
  updatedAt: string,
  dayDelivery: string,
  revisions: string,
  servicesIncludes: string[]
}>

// about
export type AboutDetailsResponseType = DefaultResponseType<{
  createdAt: string,
  updatedAt: string,
  id: string,
  about: string,
}>;
export type AboutRequestBodyType = "about";

// skills
export type SkillsRequestBodyType = {
  skill: string;
  score: number;
};
export type AllSkillsResponseType = ListResponseType<SkillsRequestBodyType & {
  id: string;
}>

// entity files
export type EntityFilesType = {
  id: string,
  filePath: string,
}

// services
export type ServiceRequestBodyType = {
  title:string,
  status:string,
  description:string,
  createdAt: string,
  updatedAt: string,
};
export type ServiceResponseBodyType = DefaultResponseType<ServiceRequestBodyType & {
  id: string,
  images: EntityFilesType[],
  imagesLinks?: string[],
  packages: string[],
}>;
export type SingleServiceResponseType = {
  id: string,
  images: string[],
  title: string,
  status: string,
  createdAt: string
};
export type AllServiceResponseType = ListResponseType<SingleServiceResponseType>;

// users
export type UsersType = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  type?: "admin" | "user",
  createdAt?: string,
  updatedAt?: string,
};

export type AllUserResponseType = ListResponseType<UsersType>

// feedbacks
export type AllFeedbackResponseType = ListResponseType<{
  firstName: string,
  lastName: string,
  rating: number,
  feedback: string,
  userId: string,
  createdAt?: string,
  id?: string,
}>

export type FeedbackRequestBodyType = {
  rating: number,
  feedback: string,
}

// user messages
export type AllMessageResponseType = ListResponseType<{
  phone: string,
  message: string,
  userId: string,
  createdAt?: string,
  id?: string,
}>

// auth
export type RegisterUserRequestType = Pick<UsersType, "firstName" | "lastName" | "email"> & { password: string };
export type LoginRequestType = Pick<RegisterUserRequestType, "email" | "password">;
export type ForgotPasswordRequestType = Pick<RegisterUserRequestType, "email">;
export type ResetPasswordRequestType = Pick<RegisterUserRequestType, "password">;
export type ChangePasswordRequestType = { oldPassword: string };

export type ContactRequestBodyType = {
  name: string,
  email: string,
  phone: string,
  message: string,
}
export type AllContactsResponseType = ContactRequestBodyType & {
  createdAt?: string,
  id?: string,
}
