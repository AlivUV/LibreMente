import { hash, compare, genSalt } from "bcrypt";

export const hashPass = async (password: string): Promise<string> => {
  password += process.env.APP_SECRET;
  const salt = await genSalt(12);
  return await hash(password, salt);
};

export const comparePass = async (
  password: string,
  encryptedPass: string
): Promise<boolean> => {
  password += process.env.APP_SECRET;
  return await compare(password, encryptedPass);
};
