import * as argon2 from 'argon2';

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    throw new Error(`Error verifying password: ${error}`);
  }
};

const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const match = await argon2.verify(hashedPassword, plainTextPassword);
    return match;
  } catch (error) {
    throw new Error(`Error verifying password: ${error}`);
  }
};

export const passwordHelpers = {
  hashPassword,
  comparePassword,
};
