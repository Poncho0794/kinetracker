import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateWorkoutLogDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', description: 'ID del usuario' })
  @IsUUID()
  @IsNotEmpty()
  user_id!: string;

  @ApiProperty({ example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', description: 'ID de la rutina ejecutada' })
  @IsUUID()
  @IsNotEmpty()
  routine_id!: string;

  @ApiProperty({ example: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', description: 'ID del ejercicio realizado' })
  @IsUUID()
  @IsNotEmpty()
  exercise_id!: string;

  @ApiProperty({ example: 1, description: 'Número de serie (1, 2, 3...)' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  set_number!: number;

  @ApiProperty({ example: 10, description: 'Repeticiones completadas en la serie' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  reps_completed!: number;

  @ApiProperty({ example: 82.5, description: 'Carga/peso utilizado en kg' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  weight_used!: number;

  @ApiPropertyOptional({ example: 8.5, description: 'Esfuerzo percibido RPE (1 a 10)' })
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  rpe?: number;

  @ApiPropertyOptional({ example: false, description: 'Indica si constituyó un récord personal (PR)' })
  @IsBoolean()
  @IsOptional()
  is_personal_record?: boolean;

  @ApiPropertyOptional({ example: '2026-10-22', description: 'Fecha del registro (YYYY-MM-DD)' })
  @IsDateString()
  @IsOptional()
  log_date?: string;

  @ApiPropertyOptional({ example: 'Buen control excéntrico y pausa en pecho', description: 'Comentarios de la serie' })
  @IsString()
  @IsOptional()
  notes?: string;
}
