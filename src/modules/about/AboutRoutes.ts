import express from "express";
import AboutCtr from "./AboutCtr";
import {vldUpdateAboutDetails} from "./AboutMw";
import {isAdmin} from "../auth/AuthMw";

const aboutRoutes = express.Router();

aboutRoutes.put("/", isAdmin, vldUpdateAboutDetails, AboutCtr.updateAboutDetails);
aboutRoutes.get("/", AboutCtr.getAboutDetails);

export default aboutRoutes;
