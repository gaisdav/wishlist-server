import type { IUserEntity } from '../modules/user/types';
import type { ITokens } from '../modules/auth/types';
import { signJwt } from '../common/utils';

export const generateTokens = (user: IUserEntity): ITokens => {
  const refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
  const accessToken = signJwt(user);
  const refreshToken = signJwt(user, {
    expiresIn: refreshTokenExpiresIn,
  });

  return { accessToken, refreshToken };
};
