import type { ITokens } from '../modules/auth/types';
import { signJwt } from '../common/utils';

export const generateTokens = (userId: number): ITokens => {
  const refreshTokenExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
  const accessToken = signJwt(userId);
  const refreshToken = signJwt(userId, {
    expiresIn: refreshTokenExpiresIn,
  });

  return { accessToken, refreshToken };
};
