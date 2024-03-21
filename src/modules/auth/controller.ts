import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IAuthController } from './types';
import { type IRequest, type IResponse } from '../../common/types';
import axios from 'axios';

const CLIENT_ID = 'CLIENT_ID';
const CLIENT_SECRET = 'CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:80/auth/google/callback';

export class AuthController extends AbstractController implements IAuthController {
  init = (server: Server): void => {
    server.post('/auth/google', this.authGoogle);
    server.get('/auth/google/callback', this.authGoogleCallback);
  };

  authGoogle = async (req: IRequest, res: IResponse): Promise<void> => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&flowName=GeneralOAuthFlow&scope=profile email`;

    res.redirect(url);
  };

  authGoogleCallback = async (req: IRequest, res: IResponse): Promise<void> => {
    console.log('req.query', req.query);
    const { code } = req.query;

    try {
      // Exchange authorization code for access token
      const { data } = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
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
