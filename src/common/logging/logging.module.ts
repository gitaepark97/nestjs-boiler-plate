import { Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { winstonLogger } from './winston';

@Module({
  providers: [
    { provide: Logger, useValue: winstonLogger },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
  exports: [Logger],
})
export class LoggingModule {}
