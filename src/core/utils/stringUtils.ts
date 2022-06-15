import crypto from "crypto";
import pwdGenerator from "generate-password";

export const generateRandomBytes = (size = 32) => {
  return crypto.randomBytes(size).toString("hex");
}

export const generateRandomPassword = (length = 8) => {
  return pwdGenerator.generate({numbers: true, length});
}

export const hasDuplicates = (array: unknown[]) => {
  return (new Set(array)).size !== array.length;
}
