import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type IRequestBody } from './common/types';

// TODO доделать
export const parseBodyToDTO = async <D = unknown, B = IRequestBody>(dto: D, body: B) => {
  const DTOInstance = plainToInstance<D, B>(dto, body);
  const errors = await validate(DTOInstance);

  return { dto: DTOInstance, errors };
};
