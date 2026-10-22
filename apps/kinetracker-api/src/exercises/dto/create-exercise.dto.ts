import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({ example: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', description: 'ID de la rutina a la que pertenece el ejercicio' })
  @IsUUID()
  @IsNotEmpty()
  routine_id!: string;

  @ApiProperty({ example: 'Press de Banca Plano con Barra', description: 'Nombre del ejercicio' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Pecho', description: 'Grupo muscular primario' })
  @IsString()
  @IsNotEmpty()
  target_muscle!: string;

  @ApiPropertyOptional({ example: ['Tríceps', 'Deltoides Frontal'], description: 'Músculos secundarios involucrados', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  secondary_muscles?: string[];

  @ApiPropertyOptional({ example: 4, description: 'Número de series objetivo' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  target_sets?: number;

  @ApiPropertyOptional({ example: 8, description: 'Repeticiones mínimas del rango' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  target_reps_min?: number;

  @ApiPropertyOptional({ example: 10, description: 'Repeticiones máximas del rango' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  target_reps_max?: number;

  @ApiPropertyOptional({ example: 85.0, description: 'Carga objetivo inicial en kg' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  target_weight?: number;

  @ApiPropertyOptional({ example: 120, description: 'Tiempo de descanso sugerido en segundos' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  rest_seconds?: number;

  @ApiPropertyOptional({ example: 'Pausa técnica de 1 seg en pecho', description: 'Notas técnicas de ejecución' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ example: 'https://example.com/squat.jpg', description: 'URL de imagen o demostración visual' })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiPropertyOptional({ example: 1, description: 'Índice de orden dentro de la rutina' })
  @IsNumber()
  @IsOptional()
  order_index?: number;
}
