import { type Server, type Request, type Response } from 'hyper-express';
import { AbstractController } from '../AbstractController';

export class AuthController extends AbstractController {
  init = (server: Server): void => {
    server.get('/', this.sayHello);
  };

  sayHello = async (req: Request, res: Response): Promise<void> => {
    res.send('Hello World');
  };
}
