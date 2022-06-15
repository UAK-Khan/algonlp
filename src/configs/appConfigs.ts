export const MIN_PASSWORD_LENGTH = 6;

export const SESSION_EXPIRY = 324000 // session time in seconds; 90 hour
export const SESSION_COOKIE_EXPIRY = 3.24e+8 // cookie time in milliseconds; 90 hour
export const SESSION_COOKIE_NAME = "site-ai";
export const SESSION_COOKIE_PATH = "/";

export const DATABASE_TYPE = "pg";
export const MIGRATION_DIR_PATH = "src/database/knex/migrations";
export const SEED_DIR_PATH = "src/database/knex/seeds";

export const PUBLIC_DIR_PATH = "public";
export const SERVICE_IMG_DIR_PATH = `${PUBLIC_DIR_PATH}/images/services`;
export const PUBLIC_SERVICE_DIR_PATH = `/images/services/`;

export const FE_REDIRECT_AFTER_ADMIN_LOGIN = "/admin/users";
export const FE_REDIRECT_AFTER_USER_LOGIN = "/";

export const RESET_PASSWORD_TOKEN_EXPIRY_TIME_IN_MS = () => Date.now() + 3600000; // 1 hour
