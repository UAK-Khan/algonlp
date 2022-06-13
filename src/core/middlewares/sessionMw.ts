import session from "express-session";
import connectRedis from "connect-redis";
import redis from "redis";
import {Errback} from "express";
import {getEnvVar} from "../utils/envUtils";
import {
  SESSION_COOKIE_EXPIRY,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_PATH,
  SESSION_EXPIRY,
} from "../../configs/appConfigs";

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();

export const redisSession = session({
  secret: getEnvVar("SESSION_SECRET"),
  name: SESSION_COOKIE_NAME,
  resave: true,
  saveUninitialized: false,
  cookie: {secure: false, path: SESSION_COOKIE_PATH, maxAge: SESSION_COOKIE_EXPIRY,},
  store: new RedisStore({
    host: getEnvVar("REDIS_HOST"),
    port: getEnvVar("REDIS_PORT"),
    client: redisClient,
    ttl: SESSION_EXPIRY,
  }),
})

redisClient.on("error", (err: Errback) => {
  console.log("Redis error: ", err);
});
