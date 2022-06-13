import {EnvVarTypes} from "../src/core/types/envVarTypes";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVarTypes {
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
