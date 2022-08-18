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
import { winstonLogger } from 'src/middlewares/logger';
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
        const controllerName = ctx['constructorRef']['name'];
        const logObject = {
          message: '',
          level: 'error',
          controllerName: controllerName,
        };
        const ctxHTTP = ctx.switchToHttp();
        logObject['response'] = ctxHTTP.getResponse();
        logObject['request'] = ctxHTTP.getRequest();
        if (typeof result === 'string') {
          logObject.message = result;
          winstonLogger.log(logObject);
          throwException(result);
        } else if (
          typeof result === 'object' &&
          result.hasOwnProperty('name') &&
          result['name'] === 'SequelizeEmptyResultError'
        ) {
          logObject.message = HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND;
          winstonLogger.log(logObject);
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
