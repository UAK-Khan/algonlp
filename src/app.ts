require("dotenv").config();
import {PUBLIC_DIR_PATH} from "./configs/appConfigs";
import {getEnvType, getEnvVar} from "./core/utils/envUtils";
import expressApp from 'express';
import bodyParser from "body-parser";
import cors from "cors";

import {requestMethodsExtension} from "./core/middlewares/requestMutationMw";
import {errorHandler} from "./core/middlewares/errorHandlerMw";
import {DB} from "./core/knex/knexConfigs";
import moduleRoutes from "./modules/moduleRoutes";
import {redisSession} from "./core/middlewares/sessionMw";
import {msgApplicationRunning, msgDatabaseConnected} from "./misc/systemMessages";

import path from "path";

const express = expressApp();

if (getEnvType() === "production") {
  express.use(expressApp.static(path.join(__dirname, "..", "build")));
}
express.use(expressApp.static(PUBLIC_DIR_PATH));

/**
 * TODO:
 * check on origin
 * set same site flag
 * see whether cors should be used in production
 */
if (getEnvType() === "development") {
  express.use(cors({
    credentials: true,
    allowedHeaders: [
      "Access-Control-Allow-Headers", "Origin", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method",
      "Access-Control-Request-Headers"
    ],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    origin: "http://localhost:3000"
  }));
}


express.use(bodyParser.json({limit: "50mb"}));
express.use(redisSession);
express.use(requestMethodsExtension);
express.use("/api", moduleRoutes);

if (getEnvType() === "production") {
  express.use("*", (req, res, next) => {
      res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });
}

express.use(errorHandler);

DB.raw("select 1+1 as result")
  .then(() => {
    console.log(msgDatabaseConnected);
    express.listen(getEnvVar("PORT"), () => console.log(msgApplicationRunning))
  }).catch(console.log);
