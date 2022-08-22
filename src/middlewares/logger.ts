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
      let method = info.method ? `  method: ${info.method}` : '';
      const message = info.message ? `  message: ${info.message}` : '';
      const controller = info.controllerName
        ? `  controller: ${info.controllerName}`
        : '';
      let params = '';
      try {
        params = info.request.params
          ? `  params: ${JSON.stringify(info.request.params)}`
          : '';
      } catch (error) {}
      try {
        method = info.request.method
          ? `  method: ${JSON.stringify(info.request.method)}`
          : '';
      } catch (error) {}

      let format = `${info.label}  level: ${info.level}  ${info.timestamp}${path}${controller}${method}${params}${message}`;
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
