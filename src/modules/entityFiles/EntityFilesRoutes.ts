import express from "express";
import EntityFilesCtr from "./EntityFilesCtr";
import {vldUpdateEntityFile} from "./EntityFilesMw";
import multer from "multer";
import {isAdmin} from "../auth/AuthMw";

const entityFilesRoutes = express.Router();

const MAX_UPLOADS = 3;

entityFilesRoutes.put("/:id", isAdmin, vldUpdateEntityFile, multer().array("images", MAX_UPLOADS), EntityFilesCtr.addEntityFile);
entityFilesRoutes.delete("/:id", isAdmin, vldUpdateEntityFile, EntityFilesCtr.deleteEntityFile);

export default entityFilesRoutes;
