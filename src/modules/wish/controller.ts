import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IRequest, type IRequestBody, type IResponse } from '../../common/types';
import { type IWishService } from './types';
import { Endpoint } from '../../common/endpoints';

export class WishController extends AbstractController {
  constructor(private readonly service: IWishService) {
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
    server.post(Endpoint.WISHES, this.create);
    server.get(Endpoint.WISHES, this.getList);
  };
}
