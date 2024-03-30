import type { ITokens } from '../modules/auth/types';
import { verifyJwt } from '../common/utils';
import { ValidationException } from '../exceptions/ValidationException';
import { generateTokens } from './generateTokens';
import { getUserByEmail } from './getCurrentUser';

export const restoreTokens = async (token: string): Promise<ITokens> => {
  const { decoded } = verifyJwt(token);

  if (!decoded?.user) {
    throw new Error('Invalid refresh token');
  }

  const user = await getUserByEmail(decoded.user.email);

  if (!user) {
    throw new ValidationException('User not found on refresh token');
  }

  return generateTokens(user);
};
