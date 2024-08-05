import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ExceptionModule } from './exception/exception.module';
import { HealthModule } from './health/health.module';
import { LoggingModule } from './logging/logging.module';
import { MetricModule } from './metric/metric.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ConfigModule,
    ValidationModule,
    LoggingModule,
    MetricModule,
    ExceptionModule,
    HealthModule,
  ],
})
export class CommonModule {}
