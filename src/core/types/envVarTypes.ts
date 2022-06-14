export type EnvTypes = 'development' | 'production';

export type EnvVarTypes = {
  NODE_ENV: EnvTypes;
  HOST: string,
  PORT: number,
  DB: string,
  DB_HOST: string,
  DB_USER: string,
  DB_PASSWORD: string,
  SESSION_SECRET: string,
  REDIS_HOST: string,
  REDIS_PORT: number
  DOMAIN: string,
  MAIL_HOST: string,
  MAIL_PORT: string,
  MAIL_AUTH_USER: string,
  MAIL_AUTH_PASSWORD: string,
  MAIL_FROM: string,
}
