import jwt from 'jsonwebtoken';
import type { IDecodedToken, IJwtPayload } from './types/session';

export function signJwt(userId: number, options: Omit<jwt.SignOptions, 'algorithm'> = {}): string {
  const tokenSecret = process.env.JWT_SECRET;
  const accessTokenExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN;

  if (!tokenSecret || !accessTokenExpiresIn) {
    throw new Error('Missing JWT_SECRET or JWT_ACCESS_EXPIRES_IN');
  }

  return jwt.sign({ userId }, tokenSecret, { expiresIn: accessTokenExpiresIn, ...options, algorithm: 'HS256' });
}

export function verifyJwt(token: string): IDecodedToken {
  try {
    const tokenSecret = process.env.JWT_SECRET;
    const accessTokenExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN;

    if (!tokenSecret || !accessTokenExpiresIn) {
      throw new Error('Missing JWT_SECRET or JWT_ACCESS_EXPIRES_IN');
    }

    const decoded = jwt.verify(token, tokenSecret) as IJwtPayload;

    if (typeof decoded !== 'object') {
      throw new Error('Invalid token');
    }

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: unknown) {
    return {
      valid: false,
      expired: e instanceof Error ? e.message === 'jwt expired' : false,
      decoded: null,
    };
  }
}
