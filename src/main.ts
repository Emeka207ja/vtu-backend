import { NestFactory } from '@nestjs/core';
import { Logger,ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';
import * as csurf from "csurf";
import * as morgan from "morgan";
import helmet from "helmet";
import { join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressHandlebars } from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger("vtu backend");

  app.use(morgan("dev"));

  app.useGlobalPipes(new ValidationPipe())
  
  app.enableCors();

  await app.listen(process.env.PORT || (process.env.NODE_ENV === 'development' ? 5000 : 5001));

  app.use(helmet());

  app.use(csurf());

  app.use(helmet.xssFilter());
  logger.debug(`vtu backend running on ${await app.getUrl()}`)
}
bootstrap();
