import { Injectable, NotFoundException } from '@nestjs/common';
import { ExerciseEntity, SupabaseService } from '../supabase/supabase.service';
import { AppLoggerService } from '../common/logger/app-logger.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly logger: AppLoggerService
  ) {
    this.logger.setContext('ExercisesService');
  }

  async findAll(routineId?: string): Promise<ExerciseEntity[]> {
    this.logger.log(`findAll -> Fetching exercises${routineId ? ` for routine ${routineId}` : ''}`);
    return this.supabaseService.getExercises(routineId);
  }

  async findOne(id: string): Promise<ExerciseEntity> {
    this.logger.log(`findOne -> Fetching exercise with id ${id}`);
    const exercise = await this.supabaseService.getExerciseById(id);
    if (!exercise) {
      this.logger.warn(`findOne -> Exercise with id ${id} not found`);
      throw new NotFoundException(`Ejercicio con ID ${id} no encontrado`);
    }
    return exercise;
  }

  async create(dto: CreateExerciseDto): Promise<ExerciseEntity> {
    this.logger.log(`create -> Creating exercise "${dto.name}" for routine ${dto.routine_id}`);
    return this.supabaseService.createExercise(dto);
  }
}
