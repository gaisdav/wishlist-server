import { type IRequest, type IResponse } from '../../common/types';

export interface IAuthController {
  authGoogle: (req: IRequest, res: IResponse) => Promise<void>;
}
