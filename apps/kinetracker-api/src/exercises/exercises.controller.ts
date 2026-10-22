import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseEntity } from '../supabase/supabase.service';

@ApiTags('Ejercicios')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar ejercicios (opcionalmente filtrados por rutina)' })
  @ApiQuery({ name: 'routineId', required: false, description: 'ID de la rutina a la que pertenecen' })
  @ApiResponse({ status: 200, description: 'Lista de ejercicios obtenida exitosamente' })
  findAll(@Query('routineId') routineId?: string): Promise<ExerciseEntity[]> {
    return this.exercisesService.findAll(routineId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un ejercicio' })
  @ApiResponse({ status: 200, description: 'Detalle del ejercicio' })
  @ApiResponse({ status: 404, description: 'Ejercicio no encontrado' })
  findOne(@Param('id') id: string): Promise<ExerciseEntity> {
    return this.exercisesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo ejercicio vinculado a una rutina (1 a muchos)' })
  @ApiResponse({ status: 201, description: 'Ejercicio creado exitosamente' })
  create(@Body() dto: CreateExerciseDto): Promise<ExerciseEntity> {
    return this.exercisesService.create(dto);
  }
}
