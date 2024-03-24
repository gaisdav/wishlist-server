import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import {
  type IAuthController,
  type IAuthControllerParams,
  type IAuthServices,
  type IGoogleTokenInfo,
  type IGoogleUserinfo,
} from './types';
import { type IRequest, type IResponse } from '../../common/types';
import axios from 'axios';
import { type IUserCreateDTO, type IUserEntity } from '../user/types';
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
  private readonly CLIENT_ID;
  private readonly CLIENT_SECRET;
  private readonly REDIRECT_URI;

  constructor(
    { GOOGLE_REDIRECT_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET }: IAuthControllerParams,
    private readonly authService: IAuthServices,
  ) {
    super();
    this.CLIENT_ID = GOOGLE_CLIENT_ID;
    this.CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
    this.REDIRECT_URI = GOOGLE_REDIRECT_URI;
  }

  init = (server: Server): void => {
    server.get('/auth/google/callback', this.authGoogleCallback);
  };

  authGoogleCallback = async (req: IRequest, res: IResponse): Promise<void> => {
    const { code } = req.query;

    try {
      const {
        data: { access_token: googleAccessToken, token_type: tokenType },
      } = await axios.post<IGoogleTokenInfo>('https://oauth2.googleapis.com/token', {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        code,
        redirect_uri: this.REDIRECT_URI,
        grant_type: 'authorization_code',
      });

      const { data } = await axios.get<IGoogleUserinfo>('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `${tokenType} ${googleAccessToken}` },
      });

      if (!data.email_verified) {
        // return res.status(403).send('Google account is not verified');
      }

      let user = await this.authService.findUserByEmail(data.email);

      if (!user) {
        const createUserParams: IUserCreateDTO = {
          username: data.email,
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          avatarSrc: data.picture,
        };

        user = await this.authService.createUserByGoogle(createUserParams);
      }

      const accessJWTToken = signJwt(user);
      const refreshJWTToken = signJwt(user, {
        expiresIn: refreshTokenExpiresIn,
      });

      verifyJwt(refreshJWTToken);

      res.cookie(accessTokenKey, accessJWTToken);
      res.cookie(refreshTokenKey, refreshJWTToken);
      res.redirect('http://localhost:5173/');
    } catch (error) {
      res.redirect('http://localhost:5173/login');
    }
  };

  // TODO move it to the service
  // reIssueAccessToken
  restoreTokens = async ({ token }: { token: string }): Promise<{ accessToken: string; refreshToken: string }> => {
    const { decoded } = verifyJwt(token);

    if (!decoded?.user) {
      throw new Error('Invalid refresh token');
    }

    const user = await this.authService.findUserByEmail(decoded.user.email);

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = signJwt(user);
    const refreshToken = signJwt(user, {
      expiresIn: refreshTokenExpiresIn,
    });

    return { accessToken, refreshToken };
  };
}
