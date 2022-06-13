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
  FE_URL: string,
  BK_URL: string,
}
