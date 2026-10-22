import { Injectable, NotFoundException } from '@nestjs/common';
import { RoutineEntity, SupabaseService } from '../supabase/supabase.service';
import { AppLoggerService } from '../common/logger/app-logger.service';
import { CreateRoutineDto } from './dto/create-routine.dto';

@Injectable()
export class RoutinesService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly logger: AppLoggerService
  ) {
    this.logger.setContext('RoutinesService');
  }

  async findAll(userId?: string): Promise<RoutineEntity[]> {
    this.logger.log(`findAll -> Fetching routines${userId ? ` for user ${userId}` : ''}`);
    return this.supabaseService.getRoutines(userId);
  }

  async findOne(id: string): Promise<RoutineEntity> {
    this.logger.log(`findOne -> Fetching routine with id ${id}`);
    const routine = await this.supabaseService.getRoutineById(id);
    if (!routine) {
      this.logger.warn(`findOne -> Routine with id ${id} not found`);
      throw new NotFoundException(`Rutina con ID ${id} no encontrada`);
    }
    return routine;
  }

  async create(dto: CreateRoutineDto): Promise<RoutineEntity> {
    this.logger.log(`create -> Creating routine "${dto.name}" for user ${dto.user_id}`);
    return this.supabaseService.createRoutine(dto);
  }
}
