import express from "express";
import {vldSaveContact} from "./ContactMw";
import ContactCtr from "./ContactCtr";
import {isAdmin} from "../auth/AuthMw";

const contactRoutes = express.Router();

contactRoutes.post("/", vldSaveContact, ContactCtr.saveContact);
contactRoutes.get("/", isAdmin, ContactCtr.getAllContacts);

export default contactRoutes;
