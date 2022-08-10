import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as util from 'util';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  customLog(request?: Request, response?: Response) {
    this.log(`path: ${request.path}`);
    this.log(`method: ${request.method}`);
    this.log(`params: ${JSON.stringify(request.params)}`);
    this.log(`body: ${JSON.stringify(request.body)}`);
    this.log(util.inspect(request));
    this.log(util.inspect(response));
  }
}
