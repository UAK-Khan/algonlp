import express from "express";
import FeedbackCtr from "./FeedbackCtr";
import {vldAddFeedback} from "./FeedbackMw";
import {isAdmin, isAuth} from "../auth/AuthMw";

const feedbackRoutes = express.Router();

feedbackRoutes.post("/", isAuth, vldAddFeedback, FeedbackCtr.addFeedback);
feedbackRoutes.get("/", FeedbackCtr.getAllFeedbacks);
feedbackRoutes.get("/:id", isAdmin, FeedbackCtr.getFeedback);

export default feedbackRoutes;
