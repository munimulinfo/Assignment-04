import jwt, { JwtPayload } from 'jsonwebtoken';

const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  options: {
    expiresIn: string;
  },
) => {
  return jwt.sign(jwtPayload, secret, options);
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
