import {getEnvVar} from "../core/utils/envUtils";

export const msgApplicationRunning = `The application is listening on port ${getEnvVar("PORT")}`;
export const msgDatabaseConnected = "The database has been connected";
export const msgServerError = "Oops. There is a server error!";
export const msgSessionNotExists = "Please login first!";
export const msgAuthenticationDenied = "Authentication Denied";
export const msgAuthorizationDenied = "You are not authorized";
export const msgBadRequest = "Invalid request!";
export const msgLogout = "You have been logout";
