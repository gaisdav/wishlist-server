import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IAuthController, type IAuthServices } from './types';
import { type IRequest, type IResponse } from '../../common/types';
import { type IUserEntity } from '../user/types';
import jwt from 'jsonwebtoken';
import { type IDecodedToken, type IJwtPayload } from '../../common/types/session';

export const tokenSecret = 'privateKey';
export const accessTokenExpiresIn = 60;
export const refreshTokenExpiresIn = '2 year';
export const accessTokenKey = 'accessToken';
export const refreshTokenKey = 'refreshToken';

// TODO move it to the service
export function signJwt(user: IUserEntity, options: Omit<jwt.SignOptions, 'algorithm'> = {}): string {
  return jwt.sign({ user }, tokenSecret, { expiresIn: accessTokenExpiresIn, ...options, algorithm: 'HS256' });
}

// TODO move it to the service
export function verifyJwt(token: string): IDecodedToken {
  try {
    const decoded = jwt.verify(token, tokenSecret) as IJwtPayload;

    if (typeof decoded !== 'object') {
      throw new Error('Invalid token');
    }

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}

export class AuthController extends AbstractController implements IAuthController {
  constructor(private readonly authService: IAuthServices) {
    super();
  }

  init = (server: Server): void => {
    server.get('/auth/google/callback', this.authGoogleCallback);
  };

  authGoogleCallback = async (req: IRequest, res: IResponse): Promise<void> => {
    const { code } = req.query;

    try {
      const { access_token: googleAccessToken, token_type: tokenType } = await this.authService.getGoogleTokens(code);

      const user = await this.authService.getGoogleUser(tokenType, googleAccessToken);

      const { accessToken, refreshToken } = await this.authService.getTokens(user);

      res.cookie(accessTokenKey, accessToken);
      res.cookie(refreshTokenKey, refreshToken);
      res.redirect('http://localhost:5173/');
    } catch (error) {
      res.redirect('http://localhost:5173/login');
    }
  };
}
