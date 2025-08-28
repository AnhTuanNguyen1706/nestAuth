import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  await app.listen(80, '0.0.0.0');
=======
  // await app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  await app.listen(process.env.PORT ?? 3000);
>>>>>>> f4cf998 (test)
}
bootstrap();
