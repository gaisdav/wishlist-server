import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IRequest, type IRequestBody, type IResponse } from '../../common/types';
import { type IUserService } from './types';
import { EEndpoint } from '../../common/endpoints';

export class UserController extends AbstractController {
  constructor(private readonly service: IUserService) {
    super();
  }

  create = async (req: IRequest, res: IResponse): Promise<void> => {
    try {
      const body: IRequestBody = await req.json();

      const user = await this.service.create(body);
      res.json(user);
    } catch (err) {
      this.errorHandler(res, err);
    }
  };

  getList = async (req: IRequest, res: IResponse): Promise<void> => {
    const list = await this.service.findAll();
    res.json(list);
  };

  init = (server: Server): void => {
    server.post(EEndpoint.USERS, this.create);
    server.get(EEndpoint.USERS, this.getList);
  };
}
