import express from "express";
import {vldAddPackage, vldUpdatePackage} from "./PackagesMw";
import PackagesCtr from "./PackagesCtr";
import {isAdmin} from "../auth/AuthMw";

const packagesRoutes = express.Router();

packagesRoutes.post("/", isAdmin, vldAddPackage, PackagesCtr.addPackage);
packagesRoutes.get("/", PackagesCtr.getAllPackages);
packagesRoutes.get("/:id", PackagesCtr.getPackage);
packagesRoutes.put("/:id", isAdmin, vldUpdatePackage, PackagesCtr.updatePackage);
packagesRoutes.delete("/:id", isAdmin, PackagesCtr.deletePackage);

export default packagesRoutes;
