import { Injectable } from '@nestjs/common';
import { SupabaseService, WorkoutLogEntity } from '../supabase/supabase.service';
import { AppLoggerService } from '../common/logger/app-logger.service';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';

@Injectable()
export class WorkoutLogsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly logger: AppLoggerService
  ) {
    this.logger.setContext('WorkoutLogsService');
  }

  async findAll(filters?: { userId?: string; date?: string; routineId?: string }): Promise<WorkoutLogEntity[]> {
    this.logger.log(`findAll -> Fetching workout logs with filters: ${JSON.stringify(filters || {})}`);
    return this.supabaseService.getWorkoutLogs(filters);
  }

  async create(dto: CreateWorkoutLogDto): Promise<WorkoutLogEntity> {
    this.logger.log(
      `create -> Logging exercise set: Exercise ${dto.exercise_id}, Set ${dto.set_number}, Reps ${dto.reps_completed}, Weight ${dto.weight_used}kg`
    );
    return this.supabaseService.createWorkoutLog(dto);
  }
}
