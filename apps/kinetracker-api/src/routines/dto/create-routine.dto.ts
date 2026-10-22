import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateRoutineDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'ID del usuario propietario de la rutina' })
  @IsUUID()
  @IsNotEmpty()
  user_id!: string;

  @ApiProperty({ example: 'Día 1 — Empuje e Hipertrofia', description: 'Título o nombre descriptivo de la rutina' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'Enfoque en pecho, hombro y tríceps', description: 'Descripción o notas de la rutina' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 1, description: 'Día de la semana (1 = Lunes, 7 = Domingo)' })
  @IsNumber()
  @Min(1)
  @Max(7)
  @IsOptional()
  day_of_week?: number;

  @ApiPropertyOptional({ example: 4, description: 'Frecuencia de días por semana asignados' })
  @IsNumber()
  @Min(1)
  @Max(7)
  @IsOptional()
  frequency_days?: number;
}
