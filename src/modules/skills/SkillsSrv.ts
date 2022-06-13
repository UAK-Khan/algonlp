import {Knex} from "knex";
import {SkillsRequestBodyType} from "../../interfaces/modulesTypes";
import SkillsDao from "./SkillsDao";
import SkillsModel from "./SkillsModel";
import Transaction = Knex.Transaction;

export const updateSkills = async (trx: Transaction, data: SkillsRequestBodyType[]) => {
  await SkillsDao.deleteAllSkills(trx);
  const skills = data.map((skill): SkillsModel => ({skill: skill.skill, score: skill.score}));
  await SkillsDao.insertMany(trx, skills);
}

export const getAllSkills = (trx: Transaction) => {
  return SkillsDao.getAll(trx, ["id", "skill", "score"]);
}
