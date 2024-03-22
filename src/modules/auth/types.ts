import { type IRequest, type IResponse } from '../../common/types';

export interface IAuthController {
  authGoogleCallback: (req: IRequest, res: IResponse) => Promise<void>;
}

export interface IAuthControllerParams {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REDIRECT_URI: string;
}
