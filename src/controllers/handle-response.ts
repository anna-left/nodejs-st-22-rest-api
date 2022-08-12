import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
import { HTTP_RESPONSE_MESSAGES } from 'src/utils/constants';
import { MyLogger } from 'src/loggers/logger';

export function handleResponse(
  answer: unknown,
  request: Request,
  response: Response,
  myLogger: MyLogger,
) {
  if (typeof answer === 'string') {
    if (answer.includes("does'n exist")) {
      myLogger.customLog(request, response);
      myLogger.customError(request, response, answer);
      throw new NotFoundException(answer);
    } else {
      myLogger.customLog(request, response);
      myLogger.customError(request, response, answer);
      throw new BadRequestException(answer);
    }
  } else if (
    typeof answer === 'object' &&
    answer.hasOwnProperty('name') &&
    answer['name'] === 'SequelizeEmptyResultError'
  ) {
    myLogger.customLog(request, response);
    myLogger.customError(request, response, answer);
    throw new NotFoundException(HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND);
  }
  response.send(answer);
  myLogger.customLog(request, response);
  return answer;
}
