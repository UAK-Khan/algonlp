import {EnvVarTypes} from "../types/envVarTypes";

export const getEnvVar = (key: keyof EnvVarTypes): any => {
  return process.env[key];
}
