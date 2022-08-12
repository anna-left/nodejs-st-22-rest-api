import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import process from 'node:process';
import { MyLogger } from './loggers/logger';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const myLogger = new MyLogger();
  process.on('uncaughtException', (err, origin) => {
    myLogger.customProcessError(`uncaughtException: ${err}, origin: ${origin}`);
  });
  // throw new Error('my test error - uncaughtException');
  process.on('unhandledRejection', (reason, promise) => {
    myLogger.customProcessError(
      `UnhandledRejection: ${promise}, reason: ${reason}`,
    );
  });
  // Promise.reject('my test promise - unhandledRejection');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(myLogger);

  const config = new DocumentBuilder()
    .setTitle('POSTGRESQL AND LAYERED ARCHITECTURE')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('POSTGRESQL')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
