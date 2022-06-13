import express from "express";
import ServicesCtr from "./ServicesCtr";
import {vldAddService, vldUpdateService} from "./ServicesMw";
import {isAdmin} from "../auth/AuthMw";

const servicesRoutes = express.Router();

servicesRoutes.post("/", isAdmin, vldAddService, ServicesCtr.addService);
servicesRoutes.get("/", ServicesCtr.getAllServices);
servicesRoutes.get("/:id", ServicesCtr.getService);
servicesRoutes.put("/:id", isAdmin, vldUpdateService, ServicesCtr.updateService);
servicesRoutes.delete("/:id", isAdmin, ServicesCtr.deleteService);

export default servicesRoutes;
