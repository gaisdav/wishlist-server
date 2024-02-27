import { type Repository } from 'typeorm/repository/Repository';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { type IUserCreateDTO, type IUserEntity } from './types';

export class UserService {
  constructor(private readonly userRepository: Repository<IUserEntity>) {}

  async create(createUserDto: IUserCreateDTO): Promise<IUserEntity> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<IUserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<IUserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: Partial<IUserEntity>): Promise<UpdateResult> {
    return await this.userRepository.update({ id }, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
