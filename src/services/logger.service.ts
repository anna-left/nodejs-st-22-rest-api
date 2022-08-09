import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  customLog(message: any, context?: string, ...optionalParams: any[]) {
    this.log(`${message} ${context} ${optionalParams}`);
  }
  controllerLog(method: any, req?: any, res?: any) {
    this.log(`${method} ${req} ${res}`);
  }
}
