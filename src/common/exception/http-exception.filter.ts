import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const [status, message] =
      exception instanceof HttpException
        ? [exception.getStatus(), exception.message]
        : [
            HttpStatus.INTERNAL_SERVER_ERROR,
            '서버 오류입니다. 잠시 후 재시도해주세요.',
          ];

    response.status(status).json({ message });
  }
}
