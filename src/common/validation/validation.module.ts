import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { RequestValidationPipe } from './request-validation.pipe';

@Module({
  providers: [{ provide: APP_PIPE, useClass: RequestValidationPipe }],
})
export class ValidationModule {}
