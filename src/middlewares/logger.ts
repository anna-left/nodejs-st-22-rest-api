import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import * as util from 'util';
import 'dotenv/config';

export function myLogger(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.label({
        label: '[winstonLogger]',
      }),
      winston.format.timestamp({
        format: 'YY-MM-DD HH:mm:ss',
      }),
      winston.format.printf((info) => {
        let format = `${info.label}  level: ${info.level}  ${info.timestamp}  path: ${info.path}  method: ${info.method}`;
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
  logger.log({
    level: 'info',
    message: 'info',
    path: request.path,
    method: request.method,
    request: util.inspect(request),
    response: util.inspect(response),
  });
  next();
}
