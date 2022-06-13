import crypto from "crypto";
import pwdGenerator from "generate-password";

export const generateRandomBytes = (size = 32) => {
  return crypto.randomBytes(size).toString("hex");
}

export const generateRandomPassword = () => {
  return pwdGenerator.generate({numbers: true, length: 8});
}
