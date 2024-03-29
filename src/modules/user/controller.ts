import { type Server } from 'hyper-express';
import { type IRequest, type IRequestBody, type IResponse } from '../../common/types';
import { type IUserService } from './types';
import { EEndpoint } from '../../common/endpoints';

export class UserController {
  constructor(
    server: Server,
    private readonly service: IUserService,
  ) {
    server.post(EEndpoint.USERS, this.create);
    server.get(EEndpoint.USERS, this.getList);
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
}
