import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  customLog(request?: Request, response?: Response) {
    this.log('***** custom logger message *****');
    this.log(`path: ${request.path}`);
    this.log(`method: ${request.method}`);
    this.log(`hostname: ${request.hostname}`);
    this.log(`params: ${JSON.stringify(request.params)}`);
    this.log(`body: ${JSON.stringify(request.body)}`);
  }
}
