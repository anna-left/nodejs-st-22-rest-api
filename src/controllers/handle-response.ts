import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { HTTP_RESPONSE_MESSAGES } from 'src/utils/constants';

type Answer = string | Model | [Model];

export function handleResponse(answer: Answer) {
  if (typeof answer === 'string') {
    if (answer.includes("does'n exist")) {
      throw new NotFoundException(answer);
    } else {
      throw new BadRequestException(answer);
    }
  } else if (
    typeof answer === 'object' &&
    answer.hasOwnProperty('name') &&
    answer['name'] === 'SequelizeEmptyResultError'
  ) {
    throw new NotFoundException(HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND);
  }
  return answer;
}
