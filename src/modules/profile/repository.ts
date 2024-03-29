import { type Repository } from 'typeorm/repository/Repository';
import { type IProfileEntity, type IProfileRepository } from './types';

export class ProfileRepository implements IProfileRepository {
  constructor(private readonly repository: Repository<IProfileEntity>) {}
}
