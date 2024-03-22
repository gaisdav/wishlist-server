import { type IRequest, type IResponse } from '../../common/types';

export interface IAuthController {
  authGoogleCallback: (req: IRequest, res: IResponse) => Promise<void>;
}

export interface IAuthControllerParams {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
}

export interface IGoogleTokenInfo {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface IGoogleUserinfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
