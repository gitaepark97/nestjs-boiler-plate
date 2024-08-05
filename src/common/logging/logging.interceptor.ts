import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const { method, originalUrl, ip, headers } = request;
    const userAgent = headers['user-agent'];
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = ctx.getResponse();
        const { statusCode } = response;
        const delay = Date.now() - now;

        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${ip} ${userAgent} - ${delay}ms`,
          context.getClass().name,
        );
      }),
      catchError((err) => {
        const delay = Date.now() - now;

        const logFormat = `${method} ${originalUrl} ${ip} ${userAgent} - ${delay}ms`;
        err instanceof HttpException
          ? this.logger.warn(
              `${logFormat} Warn: ${err.message}`,
              context.getClass().name,
            )
          : this.logger.error(logFormat, err.stack, context.getClass().name);

        return throwError(() => err);
      }),
    );
  }
}
