import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/1.0');
  const config = new DocumentBuilder()
  .setTitle('NestJs INTRO')
  .setDescription('The NestJs INTRO API description')
  .setVersion('1.0')
  .build();
 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
