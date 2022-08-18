import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { myLogger } from './middlewares/logger';
import { HandleRespInterceptor } from './interceptors/handle-resp.interceptor';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.use(myLogger);

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
