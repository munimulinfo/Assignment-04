export type TPreviousPassword = {
  password: string;
  timestamp: Date;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'user' | 'admin';
  previousPassword?: TPreviousPassword[];
};

export type TLoginUser = {
  username: string;
  password: string;
};

export type TChangePassword = {
  currentPassword: string;
  newPassword: string;
};
