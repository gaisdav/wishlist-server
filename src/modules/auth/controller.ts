import { type Server } from 'hyper-express';
import { type IAuthController, type IAuthServices } from './types';
import { type IRequest, type IResponse } from '../../common/types';
import { EEndpoint } from '../../common/endpoints';
import process from 'process';
import { generateTokens } from '../../middleware';

export class AuthController implements IAuthController {
  constructor(
    server: Server,
    private readonly authService: IAuthServices,
  ) {
    server.get(EEndpoint.GOOGLE_CALLBACK, this.authGoogleCallback);
  }

  authGoogleCallback = async (req: IRequest, res: IResponse): Promise<void> => {
    const accessTokenKey = process.env.JWT_ACCESS_KEY;
    const refreshTokenKey = process.env.JWT_REFRESH_KEY;

    if (!accessTokenKey || !refreshTokenKey) {
      throw new Error('Access token or refresh token key is not provided');
    }

    const { code } = req.query;

    const { access_token: googleAccessToken, token_type: tokenType } = await this.authService.getGoogleTokens(code);

    const user = await this.authService.getGoogleUser(tokenType, googleAccessToken);

    const { accessToken, refreshToken } = generateTokens(user.id);

    res.cookie(accessTokenKey, accessToken);
    res.cookie(refreshTokenKey, refreshToken);
    res.redirect('http://localhost:5173/');
  };
}
