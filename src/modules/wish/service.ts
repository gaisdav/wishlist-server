import { type DeleteResult, type UpdateResult } from 'typeorm';
import { type IWishEntity, type IWishRepository, type IWishService } from './types';
import { plainToInstance } from 'class-transformer';
import { CreateWishDTO } from './dto/create';
import { validate } from 'class-validator';
import { type IRequestBody } from '../../common/types';
import { ValidationException } from '../../exceptions/ValidationException';

export class WishService implements IWishService {
  constructor(private readonly wishRepository: IWishRepository) {}

  async create(body: IRequestBody): Promise<IWishEntity> {
    const wishDTO = plainToInstance(CreateWishDTO, body);
    const errors = await validate(wishDTO);

    if (errors.length > 0) {
      throw new ValidationException('Validation failed', errors);
    }

    return await this.wishRepository.create(wishDTO);
  }

  async findAll(): Promise<IWishEntity[]> {
    return await this.wishRepository.findAll();
  }

  async findOne(id: number): Promise<IWishEntity | null> {
    return await this.wishRepository.findOne(id);
  }

  async update(id: number, updateWishDto: Partial<IWishEntity>): Promise<UpdateResult> {
    return await this.wishRepository.update(id, updateWishDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.wishRepository.remove(id);
  }
}
