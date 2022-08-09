import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { Request } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  customLog(request?: Request) {
    this.log(`path: ${request.path}`);
    this.log(`method: ${request.method}`);
    this.log(`hostname: ${request.hostname}`);
    this.log(`params: ${JSON.stringify(request.params)}`);
    this.log(`body: ${JSON.stringify(request.body)}`);
  }
}
