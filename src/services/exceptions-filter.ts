import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MyLogger } from '../loggers/logger';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private myLogger: MyLogger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(request),
    };
    if (typeof exception === 'object' && exception.hasOwnProperty('message')) {
      responseBody['message'] = exception['message'];
    }

    httpAdapter.reply(response, responseBody, httpStatus);

    this.myLogger.customLog(request, response);
    this.myLogger.customError(responseBody);
  }
}
