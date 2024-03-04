import { type Repository } from 'typeorm/repository/Repository';
import { type DeleteResult, IsNull, Not, type UpdateResult } from 'typeorm';
import { type IWishCreateDTO, type IWishEntity, type IWishRepository, type IWishUpdateDTO } from './types';

export class WishRepository implements IWishRepository {
  constructor(private readonly repository: Repository<IWishEntity>) {}

  async create(createWishDto: IWishCreateDTO): Promise<IWishEntity> {
    return await this.repository.save(createWishDto);
  }

  async findAll(): Promise<IWishEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<IWishEntity | null> {
    return await this.repository.findOneBy({ id });
  }

  async findOneDeleted(id: number): Promise<IWishEntity | null> {
    return await this.repository.findOne({ where: { id, deletedAt: Not(IsNull()) }, withDeleted: true });
  }

  async update(id: number, updateWishDto: IWishUpdateDTO): Promise<UpdateResult> {
    return await this.repository.update({ id }, updateWishDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.softDelete(id);
  }
}
