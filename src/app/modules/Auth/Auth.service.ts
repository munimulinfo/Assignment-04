import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { passwordHelpers } from '../../middlewears/passwordChekar';
import { TChangePassword, TLoginUser, TUser } from './Auth.interface';
import { UserModel } from './Auth.model';
import { jwtHelpers } from './Auth.utils';

const createUserInToDb = async (payload: TUser): Promise<TUser> => {
  const result = await UserModel.create(payload);
  return result;
};

const loginUserWebsite = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({ username: payload?.username }).select(
    '+password',
  );
  if (!user) {
    throw new Error('This user is not found ! please registration first');
  }

  const plainTextPassword = payload?.password;
  const hashedPassword = user?.password;
  const isCorrectPassword = await passwordHelpers.comparePassword(
    plainTextPassword,
    hashedPassword,
  );

  if (!isCorrectPassword) {
    throw new Error('Password do not matched provide valid password');
  }

  const jwtPayload: JwtPayload = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    {
      expiresIn: config.jwt_expire_in as string,
    },
  );

  return {
    user: jwtPayload,
    accessToken,
  };
};

const userChangePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  const user = await UserModel.findById(userData?._id).select(
    '+password +previousPassword',
  );
  if (!user) {
    throw new Error('user not fount');
  }

  if (!userData?.iat) {
    throw new Error('you are not Authorized');
  }

  // if (
  //   user.passwordChangedAt &&
  //   userData?.iat < user.passwordChangedAt.getTime() / 1000
  // ) {
  //   throw new Error('Old token you not authorized');
  // }

  const isCorrectPassword = await passwordHelpers.comparePassword(
    payload?.currentPassword,
    user?.password,
  );

  if (!isCorrectPassword) {
    throw new Error('Password do not matched provide valid password');
  }

  if (
    await passwordHelpers.comparePassword(payload?.newPassword, user?.password)
  ) {
    throw new Error(
      'The new password must be different from the current password',
    );
  }

  //compare new password use before old password
  const isPasswordUsedBefore = await Promise.all(
    (user?.previousPassword || []).map(async (prevPassword) => {
      const isMatch = await passwordHelpers.comparePassword(
        payload?.newPassword,
        prevPassword?.password,
      );

      return isMatch
        ? { password: prevPassword, timestamp: prevPassword.timestamp }
        : null;
    }),
  );

  const matchingPassword = isPasswordUsedBefore?.find((match) => match);
  if (matchingPassword) {
    throw new Error(
      `This password has already been used (last used on(last used on ${matchingPassword?.timestamp} Please choose a new one.`,
    );
  }

  const newHashedPassword = await passwordHelpers.hashPassword(
    payload?.newPassword,
  );

  const updatedPreviousPasswords = [
    { password: newHashedPassword, timestamp: new Date() },
    ...(user?.previousPassword || []).slice(0, 1),
  ];

  const updatePassword = await UserModel.findByIdAndUpdate(
    userData?._id,
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
      previousPassword: updatedPreviousPasswords,
    },
    {
      new: true,
    },
  );

  return updatePassword;
};

export const AuthServices = {
  createUserInToDb,
  loginUserWebsite,
  userChangePassword,
};
