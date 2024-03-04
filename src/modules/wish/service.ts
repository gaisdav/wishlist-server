import { type IWishEntity, type IWishRepository, type IWishService } from './types';
import { plainToInstance } from 'class-transformer';
import { CreateWishDTO } from './dto/create';
import { type IRequestBody } from '../../common/types';
import { AbstractService } from '../../AbstractService';
import { UpdateWishDTO } from './dto/update';
import { NotFoundException } from '../../exceptions/NotFoundException';

export class WishService extends AbstractService implements IWishService {
  constructor(private readonly wishRepository: IWishRepository) {
    super();
  }

  async create(body: IRequestBody): Promise<IWishEntity> {
    const wishDTO = plainToInstance(CreateWishDTO, body);

    await this.validate(wishDTO);

    return await this.wishRepository.create(wishDTO);
  }

  async findAll(): Promise<IWishEntity[]> {
    return await this.wishRepository.findAll();
  }

  async findOne(id: number): Promise<IWishEntity> {
    const wish = await this.wishRepository.findOne(id);

    if (!wish) throw new NotFoundException('Wish not found');

    return wish;
  }

  async update(id: number, body: IRequestBody): Promise<IWishEntity> {
    const wishDTO = plainToInstance(UpdateWishDTO, body);
    await this.validate(wishDTO);

    const updateResult = await this.wishRepository.update(id, wishDTO);
    if (updateResult.affected === 0) {
      throw new NotFoundException('Wish not found');
    }

    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.wishRepository.remove(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Wish not found');
    }
  }
}
