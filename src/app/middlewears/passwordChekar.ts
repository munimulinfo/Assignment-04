import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 16);
};

const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const passwordHelpers = {
  hashPassword,
  comparePassword,
};
