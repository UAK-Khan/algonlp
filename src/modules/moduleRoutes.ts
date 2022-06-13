import express from "express";
import servicesRoutes from "./services/ServicesRoutes";
import packagesRoutes from "./packages/PackagesRoutes";
import usersRoutes from "./users/UsersRoutes";
import authRoutes from "./auth/AuthRoutes";
import feedbackRoutes from "./feedback/FeedbackRoutes";
import aboutRoutes from "./about/AboutRoutes";
import skillsRoutes from "./skills/SkillsRoutes";
import userMessagesRoutes from "./users/userMessages/UsersMessagesRoutes";
import metaDataRoutes from "./metaData/MetaDataRoutes";
import entityFilesRoutes from "./entityFiles/EntityFilesRoutes";
import contactRoutes from "./contact/ContactRoutes";

const moduleRoutes = express.Router();

moduleRoutes.use("/services", servicesRoutes);
moduleRoutes.use("/packages", packagesRoutes);
moduleRoutes.use("/users", usersRoutes);
moduleRoutes.use("/user-messages", userMessagesRoutes);
moduleRoutes.use("/auth", authRoutes);
moduleRoutes.use("/feedbacks", feedbackRoutes);
moduleRoutes.use("/about", aboutRoutes);
moduleRoutes.use("/skills", skillsRoutes);
moduleRoutes.use("/metadata", metaDataRoutes);
moduleRoutes.use("/entity-files", entityFilesRoutes);
moduleRoutes.use("/contact-us", contactRoutes);

export default moduleRoutes;
