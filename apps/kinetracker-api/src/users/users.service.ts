import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService, UserEntity } from '../supabase/supabase.service';
import { AppLoggerService } from '../common/logger/app-logger.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly logger: AppLoggerService
  ) {
    this.logger.setContext('UsersService');
  }

  async findAll(): Promise<UserEntity[]> {
    this.logger.log('findAll -> Fetching all users');
    return this.supabaseService.getUsers();
  }

  async findOne(id: string): Promise<UserEntity> {
    this.logger.log(`findOne -> Fetching user with id ${id}`);
    const user = await this.supabaseService.getUserById(id);
    if (!user) {
      this.logger.warn(`findOne -> User with id ${id} not found`);
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    this.logger.log(`create -> Creating user with email ${dto.email}`);
    return this.supabaseService.createUser(dto);
  }
}
