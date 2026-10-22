import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'atleta@kinetracker.app', description: 'Correo electrónico único del usuario' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: 'Alfonso Banda', description: 'Nombre completo del atleta' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg', description: 'URL de imagen de perfil' })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiPropertyOptional({ example: 4, description: 'Meta de frecuencia semanal de entrenamientos' })
  @IsNumber()
  @Min(1)
  @Max(7)
  @IsOptional()
  weekly_goal_days?: number;
}
