import { type IProfileRepository, type IProfileService } from './types';
import { AbstractService } from '../../AbstractService';

export class ProfileService extends AbstractService implements IProfileService {
  constructor(private readonly profileRepository: IProfileRepository) {
    super();
  }
}
