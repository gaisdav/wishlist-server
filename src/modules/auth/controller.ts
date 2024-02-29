import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IAuthController } from './types';
import { type IRequest, type IResponse } from '../../common/types';

export class AuthController extends AbstractController implements IAuthController {
  init = (server: Server): void => {
    server.post('/auth/google', this.authGoogle);
  };

  authGoogle = async (req: IRequest, res: IResponse): Promise<void> => {
    res.send('Hello World');
  };
}
