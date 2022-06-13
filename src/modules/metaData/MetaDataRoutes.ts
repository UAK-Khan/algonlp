import express from "express";
import MetaDataCtr from "./MetaDataCtr";
import {isAdmin} from "../auth/AuthMw";

const metaDataRoutes = express.Router();

metaDataRoutes.put("/", isAdmin, MetaDataCtr.updateMetaData);
metaDataRoutes.get("/", MetaDataCtr.getAllMetaData);

export default metaDataRoutes;
