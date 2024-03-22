import { type Repository } from 'typeorm/repository/Repository';
import { type DeleteResult, type UpdateResult } from 'typeorm';
import { type IUserCreateDTO, type IUserEntity, type IUserRepository } from './types';

export class UserRepository implements IUserRepository {
  constructor(private readonly repository: Repository<IUserEntity>) {}

  async create(createUserDto: IUserCreateDTO): Promise<IUserEntity> {
    return await this.repository.save(createUserDto);
  }

  async findAll(): Promise<IUserEntity[]> {
    return await this.repository.find();
  }

  async findOneById(id: number): Promise<IUserEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<IUserEntity | null> {
    return await this.repository.findOneBy({ email });
  }

  async update(id: number, updateUserDto: Partial<IUserEntity>): Promise<UpdateResult> {
    return await this.repository.update({ id }, updateUserDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
