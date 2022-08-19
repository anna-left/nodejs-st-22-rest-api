import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { UsersService } from 'src/services/users.service';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { HTTP_RESPONSE_MESSAGES } from 'src/utils/constants';
import { winstonLogger } from './logger';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request: Request | any, response: Response, next: NextFunction) {
    try {
      const authHeader = request.headers.authorization.split(' ');
      const bearer = authHeader[0].toLowerCase();
      const token = authHeader[1];
      if (bearer !== 'bearer' || !token) {
        winstonLogger.log({
          level: 'error',
          message: HTTP_RESPONSE_MESSAGES.INVALID_TOKEN,
        });
        return response.status(401).send(HTTP_RESPONSE_MESSAGES.INVALID_TOKEN);
      }
      try {
        const decoded: any = jwt.verify(
          token,
          process.env.PRIVATE_KEY || 'mySecretKey',
        );
        request.user = await this.usersService.findOne(decoded.id);
        next();
      } catch (error) {
        winstonLogger.log({
          level: 'error',
          message: HTTP_RESPONSE_MESSAGES.FORBIDDEN,
        });
        return response.status(403).send(HTTP_RESPONSE_MESSAGES.FORBIDDEN);
      }
    } catch (error) {
      winstonLogger.log({
        level: 'error',
        message: HTTP_RESPONSE_MESSAGES.INVALID_TOKEN,
      });
      return response.status(401).send(HTTP_RESPONSE_MESSAGES.INVALID_TOKEN);
    }
  }
}
