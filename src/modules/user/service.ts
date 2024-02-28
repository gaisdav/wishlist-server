import { type DeleteResult, type UpdateResult } from 'typeorm';
import { type IUserEntity, type IUserRepository, type IUserService } from './types';
import { plainToClass, plainToInstance } from 'class-transformer';
import { CreateUserDTO } from './dto/create';
import { validate } from 'class-validator';
import { type IRequest, type IRequestBody } from '../../common/types';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(body: IRequestBody): Promise<IUserEntity> {
    const userDTO = plainToInstance(CreateUserDTO, body);
    const errors = await validate(userDTO);

    if (errors.length > 0) {
      console.log(errors);
      throw new Error('Validation failed');
    }

    return await this.userRepository.create(userDTO);
  }

  async findAll(): Promise<IUserEntity[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<IUserEntity | null> {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: Partial<IUserEntity>): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.remove(id);
  }
}
