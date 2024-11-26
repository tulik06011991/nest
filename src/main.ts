import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet'
import * as csurf from 'csurf'
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(cookieParser())

  // CSRF himoyasi middleware'ni qo'shish
  app.use(csurf({ cookie: true }));
 
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true
    })
  )
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
