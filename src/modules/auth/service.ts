import { type IAuthServices } from './types';
import { type IUserCreateDTO, type IUserEntity, type IUserService } from '../user/types';
import { AbstractService } from '../../AbstractService';

export class AuthService extends AbstractService implements IAuthServices {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async findUserByEmail(email: string): Promise<IUserEntity | null> {
    return await this.userService.findOneByEmail(email);
  }

  async createUserByGoogle(user: IUserCreateDTO): Promise<IUserEntity> {
    return await this.userService.create(user);
  }
}
