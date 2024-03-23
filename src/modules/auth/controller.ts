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
import { type IUserCreateDTO } from '../user/types';

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
        data: { access_token: accessToken, token_type: tokenType },
      } = await axios.post<IGoogleTokenInfo>('https://oauth2.googleapis.com/token', {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        code,
        redirect_uri: this.REDIRECT_URI,
        grant_type: 'authorization_code',
      });

      const { data } = await axios.get<IGoogleUserinfo>('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `${tokenType} ${accessToken}` },
      });

      const user = await this.authService.findUserByEmail(data.email);

      if (user) {
        console.log('existed', user);
      } else {
        const createUserParams: IUserCreateDTO = {
          username: data.email,
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          avatarSrc: data.picture,
        };

        const user = await this.authService.createUserByGoogle(createUserParams);
        console.log('created', user);
      }

      // TODO - Redirect to the home page. Use environment variable for the URL
      res.redirect('http://localhost:5173/');
    } catch (error) {
      // TODO - Redirect to the login page. Use environment variable for the URL
      res.redirect('http://localhost:5173/login');
    }
  };
}
