import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CommonModule, CoreModule],
})
export class AppModule {}
