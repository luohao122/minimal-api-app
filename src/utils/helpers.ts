import { compare, hash } from "bcrypt";

const SALT_ROUND = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUND);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return compare(password, hashedPassword);
};
