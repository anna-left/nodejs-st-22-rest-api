import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as util from 'util';
import winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  winstonLogger: winston.Logger;
  constructor() {
    super();
    this.winstonLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.label({
          label: '[winstonLogger]',
        }),
        winston.format.timestamp({
          format: 'YY-MM-DD HH:mm:ss',
        }),
        winston.format.printf(
          (info) =>
            `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
        ),
      ),
      transports: [
        new winston.transports.Console({
          level: 'error',
        }),
        new winston.transports.Console({
          level: 'info',
        }),
      ],
    });
  }

  customLog(request: Request, response: Response) {
    this.log(`path: ${request.path}`);
    this.log(`method: ${request.method}`);
    this.log(`params: ${JSON.stringify(request.params)}`);
    this.log(`body: ${JSON.stringify(request.body)}`);
    if (process.env.LOG_REQUEST_RESPONSE !== 'false') {
      this.log(util.inspect(request));
      this.log(util.inspect(response));
    }
  }
  customError(responseBody: unknown) {
    this.error(responseBody);
  }
  customProcessError(errMessage: string) {
    this.error(errMessage);
  }
  customWinstonError(responseBody: unknown) {
    this.winstonLogger.error(responseBody);
  }
}
