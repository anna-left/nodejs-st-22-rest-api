import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { myLogger, winstonLogger } from './middlewares/logger';
import { HandleRespInterceptor } from './interceptors/handle-resp.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.use(myLogger);

  process.on('uncaughtException', (error, origin) => {
    winstonLogger.log({
      level: 'error',
      message: `uncaughtException: ${error.message}, origin: ${origin}`,
      error,
    });
    process.exit();
  });
  //throw new Error('my test error - uncaughtException');

  process.on('unhandledRejection', (reason, promise) => {
    winstonLogger.log({
      level: 'error',
      message: `UnhandledRejection: ${promise}, reason: ${reason}`,
    });
    process.exit();
  });
  //Promise.reject('my test promise - unhandledRejection');

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
  app.useGlobalInterceptors(new HandleRespInterceptor());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
