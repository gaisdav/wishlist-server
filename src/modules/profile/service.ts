import { type IProfileEntity, type IProfileRepository, type IProfileService, type IProfileUpdateDTO } from './types';
import { AbstractService } from '../../AbstractService';
import { type IRequestBody } from '../../common/types';
import { UpdateProfileDTO } from './dto/update';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '../../exceptions/NotFoundException';

export class ProfileService extends AbstractService implements IProfileService {
  constructor(private readonly profileRepository: IProfileRepository) {
    super();
  }

  async getProfile(id: number): Promise<IProfileEntity> {
    const profile = await this.profileRepository.getProfile(id);

    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }

    return profile;
  }

  async updateProfile(id: number, data: IRequestBody): Promise<IProfileEntity> {
    const profileDTO = plainToInstance(UpdateProfileDTO, data);
    await this.validate(profileDTO);
    const result = await this.profileRepository.updateProfile(id, data);

    if (!result.affected) {
      throw new NotFoundException('Profile not found');
    }

    return await this.getProfile(id);
  }
}
