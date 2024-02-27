import { type Server } from 'hyper-express';
import { AbstractController } from '../AbstractController';
import { type UserService } from './service';
import { type IRequest, type IResponse } from '../common/types';

export class UserController extends AbstractController {
  // TODO use interface IUserService
  constructor(private readonly service: UserService) {
    super();
  }

  create = async (req: IRequest<Record<number, string>>, res: IResponse): Promise<void> => {
    await this.service.create(req.body);
    res.send('Hello World');
  };

  getList = async (req: IRequest<Record<number, string>>, res: IResponse): Promise<void> => {
    const list = await this.service.findAll();
    res.json(list);
  };

  init = (server: Server): void => {
    server.post('/user', this.create);
    server.get('/user', this.getList);
  };
}
