import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IAuthController, type IAuthControllerParams } from './types';
import { type IRequest, type IResponse } from '../../common/types';
import axios from 'axios';

export class AuthController extends AbstractController implements IAuthController {
  private readonly CLIENT_ID;
  private readonly CLIENT_SECRET;
  private readonly REDIRECT_URI;

  constructor({ GOOGLE_REDIRECT_URI, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET }: IAuthControllerParams) {
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
      // Exchange authorization code for access token
      const { data } = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        code,
        redirect_uri: this.REDIRECT_URI,
        grant_type: 'authorization_code',
      });
      console.log('data', data);
      // const { access_token, id_token } = data;

      // Use access_token or id_token to fetch user profile
      const _data = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `${data.token_type} ${data.access_token}` },
      });

      console.log('_data.data', _data.data);

      // Code to handle user authentication and retrieval using the profile data

      res.redirect('http://localhost:5173/');
    } catch (error) {
      console.error('Error:', error);
      res.redirect('http://localhost:5173/login');
    }
  };
}
