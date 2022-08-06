import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Model } from 'sequelize-typescript';

type Answer = string | Model | [Model];

export function handleResponse(answer: Answer) {
  if (typeof answer === 'string') {
    if (answer.includes("does'n exist")) {
      throw new NotFoundException(answer);
    } else {
      throw new BadRequestException(answer);
    }
  }
  return answer;
}
