import { type Server } from 'hyper-express';
import { type IRequest, type IRequestBody, type IResponse } from '../../common/types';
import { type IWishController, type IWishService } from './types';
import { EEndpoint } from '../../common/endpoints';
import { authGuard } from '../../middleware';

export class WishController implements IWishController {
  constructor(
    server: Server,
    private readonly service: IWishService,
  ) {
    server.post(EEndpoint.WISHES, [authGuard], this.create);
    server.get(EEndpoint.WISHES, [authGuard], this.getList);
    server.patch(EEndpoint.WISHES_ID, this.update);
    server.delete(EEndpoint.WISHES_ID, this.remove);
  }

  create = async (req: IRequest, res: IResponse): Promise<void> => {
    const body: IRequestBody = await req.json();

    const wish = await this.service.create(body);
    res.json(wish);
  };

  getList = async (_: IRequest, res: IResponse): Promise<void> => {
    const list = await this.service.findAll();
    res.json(list);
  };

  update = async (req: IRequest, res: IResponse): Promise<void> => {
    const { id } = req.params;
    const body: IRequestBody = await req.json();

    const wish = await this.service.update(Number(id), body);
    res.json(wish);
  };

  remove = async (req: IRequest, res: IResponse): Promise<void> => {
    const { id } = req.params;

    await this.service.remove(Number(id));
    res.json({});
  };
}
