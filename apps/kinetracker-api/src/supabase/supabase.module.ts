import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase.service';
import { AppLoggerService } from '../common/logger/app-logger.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SupabaseService, AppLoggerService],
  exports: [SupabaseService, AppLoggerService],
})
export class SupabaseModule {}
