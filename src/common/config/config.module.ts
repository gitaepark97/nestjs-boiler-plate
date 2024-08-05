import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { serverConfig } from './server.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
      validate,
      load: [serverConfig],
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
