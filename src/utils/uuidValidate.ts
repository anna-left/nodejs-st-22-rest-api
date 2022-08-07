import { validate, version } from 'uuid';

export const uuidValidate = (uuid: string[]): boolean => {
  for (let i = 0; i < uuid.length; i++) {
    if (validate(uuid[i]) && version(uuid[i]) === 4) {
    } else return false;
  }
  return true;
};
