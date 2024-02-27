import { type Server } from 'hyper-express';
import { AbstractController } from '../AbstractController';
import { type UserService } from './service';
import { type IRequest, type IResponse } from '../common/types';
import { type IUserCreateDTO } from './types';
import { plainToClass } from 'class-transformer';
import { CreateUserDTO } from './dto/create';
import { validate } from 'class-validator';

export class UserController extends AbstractController {
  // TODO use interface IUserService
  constructor(private readonly service: UserService) {
    super();
  }

  create = async (req: IRequest<Record<number, string>>, res: IResponse): Promise<void> => {
    const body: IUserCreateDTO = await req.json();
    const userDTO = plainToClass(CreateUserDTO, body);
    const errors = await validate(userDTO);

    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    const user = await this.service.create(userDTO);
    res.json(user);
  };

  getList = async (req: IRequest<Record<number, string>>, res: IResponse): Promise<void> => {
    const list = await this.service.findAll();
    res.json(list);
  };

  init = (server: Server): void => {
    server.post('/user', this.create);
    server.get('/user', this.getList);
  };
}
