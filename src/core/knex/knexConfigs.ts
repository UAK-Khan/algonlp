import knex from "knex";
import {getEnvVar} from "../utils/envUtils";
import {MIGRATION_DIR_PATH, SEED_DIR_PATH} from "../../configs/appConfigs";

export const KnexConfig = {
  client: "pg",
  connection: {
    host: getEnvVar("DB_HOST"),
    user: getEnvVar("DB_USER"),
    password: getEnvVar("DB_PASSWORD"),
    database: getEnvVar("DB"),
    charset: "utf8",
  },
  migrations: {
    directory: MIGRATION_DIR_PATH,
    extension: "ts",
  },
  seeds: {
    directory: SEED_DIR_PATH,
    extension: "ts",
  },
};

export const DB = knex(KnexConfig);
