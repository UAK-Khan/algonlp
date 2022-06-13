import express from "express";
import SkillsCtr from "./SkillsCtr";
import {vldUpdateSkills} from "./SkillsMw";
import {isAdmin} from "../auth/AuthMw";

const skillsRoutes = express.Router();

skillsRoutes.put("/", isAdmin, vldUpdateSkills, SkillsCtr.updateSkills);
skillsRoutes.get("/", SkillsCtr.getAllSkills);

export default skillsRoutes;
