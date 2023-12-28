import { z } from 'zod';

const passwordValidation = z
  .string({ required_error: 'Password is required' })
  .refine(
    (password): password is string => {
      const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      return regex.test(password);
    },
    {
      message:
        'Password must contain at least one uppercase letter, one special character, one number, and be at least 6 characters long.',
    },
  );

const userCreateValidationSchema = z.object({
  body: z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    email: z.string().email({ message: 'Invalid email format.' }),
    password: passwordValidation,
    role: z.enum(['user', 'admin']).default('user'),
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

const userPasswordValidation = z.object({
  body: z.object({
    currentPassword: z.string({
      required_error: 'current password is required',
    }),
    newPassword: passwordValidation,
  }),
});

export const AuthValidation = {
  userCreateValidationSchema,
  userLoginValidationSchema,
  userPasswordValidation,
};
