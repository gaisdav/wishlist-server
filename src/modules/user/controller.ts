import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IRequest, type IRequestBody, type IResponse } from '../../common/types';
import { type IUserService } from './types';

export class UserController extends AbstractController {
  // TODO use interface IUserService
  constructor(private readonly service: IUserService) {
    super();
  }

  create = async (req: IRequest, res: IResponse): Promise<void> => {
    const body: IRequestBody = await req.json();

    const user = await this.service.create(body);
    res.json(user);
  };

  getList = async (req: IRequest, res: IResponse): Promise<void> => {
    const list = await this.service.findAll();
    res.json(list);
  };

  init = (server: Server): void => {
    server.post('/user', this.create);
    server.get('/user', this.getList);
  };
}
