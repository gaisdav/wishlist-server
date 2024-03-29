import { type Server } from 'hyper-express';
import { EEndpoint } from '../../common/endpoints';
import { authGuard } from '../../middleware';
import { type IProfileController } from './types';
import { type IRequest, type IResponse } from '../../common/types';

export class ProfileController implements IProfileController {
  constructor(
    server: Server,
    // private readonly service: IWishService,
  ) {
    server.get(EEndpoint.PROFILE, [authGuard], this.getProfile);
  }

  getProfile = async (req: IRequest, res: IResponse): Promise<void> => {
    const profile = res.locals.user;

    res.json(profile);
  };
}
