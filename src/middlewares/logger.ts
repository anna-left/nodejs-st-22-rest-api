import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import * as util from 'util';
import 'dotenv/config';

export const winstonLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.label({
      label: '[winstonLogger]',
    }),
    winston.format.timestamp({
      format: 'YY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => {
      const path = info.path ? `  path: ${info.path}` : '';
      const method = info.method ? `  method: ${info.method}` : '';
      const message = info.message ? `  message: ${info.message}` : '';
      let format = `${info.label}  level: ${info.level}  ${info.timestamp}${message}${path}${method}`;
      if (process.env.LOG_REQUEST_RESPONSE !== 'false') {
        format = format.concat(
          `request: ${util.inspect(info.request)}\nresponse: ${util.inspect(
            info.response,
          )}`,
        );
      }
      return format;
    }),
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

export function myLogger(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  winstonLogger.log({
    level: 'info',
    message: 'info',
    path: request.path,
    method: request.method,
    request: util.inspect(request),
    response: util.inspect(response),
  });
  next();
}
