import {EnvTypes, EnvVarTypes} from "../types/envVarTypes";

export const getEnvVar = (key: keyof EnvVarTypes): any => {
  return process.env[key];
}

export const getEnvType = ():EnvTypes => {
  return process.env.NODE_ENV as EnvTypes;
}
