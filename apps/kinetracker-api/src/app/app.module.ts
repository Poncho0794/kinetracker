import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { UsersModule } from '../users/users.module';
import { RoutinesModule } from '../routines/routines.module';
import { ExercisesModule } from '../exercises/exercises.module';
import { WorkoutLogsModule } from '../workout-logs/workout-logs.module';
import { AppLoggerService } from '../common/logger/app-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/kinetracker-api/.env', '.env'],
    }),
    SupabaseModule,
    UsersModule,
    RoutinesModule,
    ExercisesModule,
    WorkoutLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppLoggerService],
})
export class AppModule {}
