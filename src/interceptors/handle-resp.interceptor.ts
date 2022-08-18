import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HTTP_RESPONSE_MESSAGES } from '../utils/constants';

export interface Response<T> {
  result: T;
}

@Injectable()
export class HandleRespInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((result) => {
        if (typeof result === 'string') {
          throwException(result);
        } else if (
          typeof result === 'object' &&
          result.hasOwnProperty('name') &&
          result['name'] === 'SequelizeEmptyResultError'
        ) {
          throwException(HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND);
        }
        return result;
      }),
    );
  }
}

function throwException(message: string) {
  switch (message) {
    case HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND:
      throw new NotFoundException(message);
    case HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND:
      throw new NotFoundException(message);
    case HTTP_RESPONSE_MESSAGES.WRONG_LOGIN_PASSWORD:
      throw new UnauthorizedException(message);
    case HTTP_RESPONSE_MESSAGES.INVALID_TOKEN:
      throw new UnauthorizedException(message);
    case HTTP_RESPONSE_MESSAGES.FORBIDDEN:
      throw new ForbiddenException(message);
    default:
      throw new BadRequestException(message);
  }
}
