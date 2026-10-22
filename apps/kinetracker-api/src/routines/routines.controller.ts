import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { RoutineEntity } from '../supabase/supabase.service';

@ApiTags('Rutinas')
@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar rutinas (opcionalmente filtradas por usuario)' })
  @ApiQuery({ name: 'userId', required: false, description: 'ID del usuario propietario' })
  @ApiResponse({ status: 200, description: 'Lista de rutinas obtenida exitosamente' })
  findAll(@Query('userId') userId?: string): Promise<RoutineEntity[]> {
    return this.routinesService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de una rutina' })
  @ApiResponse({ status: 200, description: 'Detalle de la rutina' })
  @ApiResponse({ status: 404, description: 'Rutina no encontrada' })
  findOne(@Param('id') id: string): Promise<RoutineEntity> {
    return this.routinesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva rutina vinculada a un usuario (1 a muchos)' })
  @ApiResponse({ status: 201, description: 'Rutina creada exitosamente' })
  create(@Body() dto: CreateRoutineDto): Promise<RoutineEntity> {
    return this.routinesService.create(dto);
  }
}
