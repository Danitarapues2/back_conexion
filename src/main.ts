import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ParseIntExceptionFilter } from './users/parse-int-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new ParseIntExceptionFilter());
  await app.listen(3000);
}
bootstrap();
