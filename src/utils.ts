import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

// TODO доделать
export const validateBody = async <T, R>(dto: T, body: R) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const plainedDTO = plainToInstance(dto, body);
  const errors = await validate(plainedDTO);

  return [dto, errors];
};
