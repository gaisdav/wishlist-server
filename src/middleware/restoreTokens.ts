import type { ITokens } from '../modules/auth/types';
import { verifyJwt } from '../common/utils';
import { generateTokens } from './generateTokens';
import { getUserById } from './getCurrentUser';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

export const restoreTokens = async (token: string): Promise<ITokens> => {
  const { decoded } = verifyJwt(token);

  if (!decoded?.userId) {
    throw new Error('Invalid refresh token');
  }

  const user = await getUserById(decoded.userId);
  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  return generateTokens(user.id);
};
