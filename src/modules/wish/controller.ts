import { type Server } from 'hyper-express';
import { AbstractController } from '../../AbstractController';
import { type IRequest, type IRequestBody, type IResponse } from '../../common/types';
import { type IWishService } from './types';
import { EEndpoint } from '../../common/endpoints';
import { deserializeUser } from '../../middleware/deserializeUser';
import { authGuard } from '../../middleware/authGuard';

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
      const body: IRequestBody = await req.json();

      const wish = await this.service.update(Number(id), body);
      res.json(wish);
    } catch (err) {
      this.errorHandler(res, err);
    }
  };

  remove = async (req: IRequest, res: IResponse): Promise<void> => {
    try {
      const { id } = req.params;

      await this.service.remove(Number(id));
      res.json({});
    } catch (err) {
      this.errorHandler(res, err);
    }
  };

  init = (server: Server): void => {
    server.post(EEndpoint.WISHES, [deserializeUser, authGuard], this.create);
    server.get(EEndpoint.WISHES, this.getList);
    server.patch(EEndpoint.WISHES_ID, this.update);
    server.delete(EEndpoint.WISHES_ID, this.remove);
  };
}
