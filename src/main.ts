import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { serverConfig } from './common/config/server.config';
import { winstonLogger } from './common/logging/winston';
import { setUpSwagger } from './common/open-api/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: winstonLogger });

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(helmet());
  app.enableCors();

  setUpSwagger(app);

  const PORT = app.get(serverConfig.KEY).port;
  await app.listen(PORT);
}

bootstrap();
