import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IRequest, type IRequestBody, type IResponse } from '../../common/types';
import { type IWishService } from './types';
import { Endpoint } from '../../common/endpoints';

// TODO: add IWishController interface

export class WishController extends AbstractController {
  constructor(private readonly service: IWishService) {
    super();
  }

  create = async (req: IRequest, res: IResponse): Promise<void> => {
    try {
      const body: IRequestBody = await req.json();

      const wish = await this.service.create(body);
      res.json(wish);
    } catch (err) {
      this.errorHandler(res, err);
    }
  };

  getList = async (_: IRequest, res: IResponse): Promise<void> => {
    const list = await this.service.findAll();
    res.json(list);
  };

  update = async (req: IRequest, res: IResponse): Promise<void> => {
    try {
      const { id } = req.params;
      const body = await req.json();

      const wish = await this.service.update(Number(id), body);
      res.json(wish);
    } catch (err) {
      this.errorHandler(res, err);
    }
  };

  init = (server: Server): void => {
    server.post(Endpoint.WISHES, this.create);
    server.get(Endpoint.WISHES, this.getList);
    server.patch(Endpoint.WISHES_ID, this.update);
  };
}
