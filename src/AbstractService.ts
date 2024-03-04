import { ValidationException } from './exceptions/ValidationException';
import { validate } from 'class-validator';

export abstract class AbstractService {
  async validate(object: object): Promise<void> {
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new ValidationException('Validation failed', errors);
    }
  }
}
