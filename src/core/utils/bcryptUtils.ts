import bcrypt from "bcryptjs";

const salt = 12;

export const bcryptHash = (value: string): Promise<string> => {
  return bcrypt.hash(value, salt);
}

export const bcryptCompare = (value1: string, value2: string): Promise<boolean> => {
  return bcrypt.compare(value1, value2);
}
