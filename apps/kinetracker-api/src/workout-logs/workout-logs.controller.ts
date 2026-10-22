import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutLogsService } from './workout-logs.service';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';
import { WorkoutLogEntity } from '../supabase/supabase.service';

@ApiTags('Registros de Entrenamiento')
@Controller('workout-logs')
export class WorkoutLogsController {
  constructor(private readonly workoutLogsService: WorkoutLogsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar registros de series realizadas por fecha, usuario o rutina' })
  @ApiQuery({ name: 'userId', required: false, description: 'ID del usuario' })
  @ApiQuery({ name: 'date', required: false, description: 'Fecha del registro (YYYY-MM-DD)' })
  @ApiQuery({ name: 'routineId', required: false, description: 'ID de la rutina' })
  @ApiResponse({ status: 200, description: 'Lista de registros obtenida exitosamente' })
  findAll(
    @Query('userId') userId?: string,
    @Query('date') date?: string,
    @Query('routineId') routineId?: string
  ): Promise<WorkoutLogEntity[]> {
    return this.workoutLogsService.findAll({ userId, date, routineId });
  }

  @Post()
  @ApiOperation({ summary: 'Registrar una serie de ejercicio realizada por día' })
  @ApiResponse({ status: 201, description: 'Registro guardado exitosamente' })
  create(@Body() dto: CreateWorkoutLogDto): Promise<WorkoutLogEntity> {
    return this.workoutLogsService.create(dto);
  }
}
