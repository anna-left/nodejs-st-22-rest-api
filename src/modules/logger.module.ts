import { Module } from '@nestjs/common';
import { MyLogger } from 'src/loggers/logger';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
