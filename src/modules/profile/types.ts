import type { IUserEntity } from '../user/types';
import { type IRequest, type IResponse } from '../../common/types';

export interface IProfileEntity extends IUserEntity {}

export interface IProfileUpdateDTO {}

export interface IProfileController {
  getProfile: (req: IRequest, res: IResponse) => Promise<void>;
}

export interface IProfileRepository {}

export interface IProfileService {}
