import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AppLoggerService } from '../common/logger/app-logger.service';

export interface UserEntity {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  weekly_goal_days: number;
  created_at: string;
  updated_at: string;
}

export interface RoutineEntity {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  day_of_week?: number;
  frequency_days: number;
  created_at: string;
  updated_at: string;
}

export interface ExerciseEntity {
  id: string;
  routine_id: string;
  name: string;
  target_muscle: string;
  secondary_muscles: string[];
  target_sets: number;
  target_reps_min: number;
  target_reps_max: number;
  target_weight: number;
  rest_seconds: number;
  notes?: string;
  image_url?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface WorkoutLogEntity {
  id: string;
  user_id: string;
  routine_id: string;
  exercise_id: string;
  set_number: number;
  reps_completed: number;
  weight_used: number;
  rpe?: number;
  is_personal_record: boolean;
  log_date: string;
  notes?: string;
  created_at: string;
}

@Injectable()
export class SupabaseService implements OnModuleInit {
  private client: SupabaseClient | null = null;
  private isConnectedToRemote = false;

  // In-memory fallback dataset for seamless local development
  private memoryUsers: UserEntity[] = [
    {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      email: 'atleta@kinetracker.app',
      name: 'Alfonso Banda',
      avatar_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBxcVAi7b1BZ8MgF9e5WwLW0vDPcgGwiElR73LaZzjvBtK6eYi9jU6NFfAVKAqMGcvljpaNEhO-UdDqrydG-hwVTYEjfU6E4tRmg2dqSvP72zzaqmeoh0WrSM_MTm_n8qjUE8NWYAJJxYQaio5KcafsJ_LTCdhV1lKcVPTxt-jYul75Hg9UiHlUBHk7vbViT2ZR8XMjNZPeeL14v4Xe0GIEmg92JJJZypdKWyy7d594aaLDXh8ErZJU',
      weekly_goal_days: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  private memoryRoutines: RoutineEntity[] = [
    {
      id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      name: 'Día 1 — Empuje e Hipertrofia',
      description:
        'Enfoque principal en tensión mecánica alta en press con barra y tempo controlado concéntrico. Asegura 2-3 min de descanso en series pesadas.',
      day_of_week: 1,
      frequency_days: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  private memoryExercises: ExerciseEntity[] = [
    {
      id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
      routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      name: 'Press de Banca Plano con Barra',
      target_muscle: 'Pecho',
      secondary_muscles: ['Tríceps', 'Deltoides Frontal'],
      target_sets: 4,
      target_reps_min: 8,
      target_reps_max: 10,
      target_weight: 85.0,
      rest_seconds: 120,
      notes: 'Pausa técnica de 1 seg en pecho • Agarre ligeramente fuera del ancho de hombros',
      image_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDm9kGEUoRtnp3Y4UxpgtSmI_qM2SuFNXm9A8EEtxjBn-ofqM0DH9ouUTB0Mafo1MF0ShU3cNGtRCdHwahneyowYylJLKwBSSyFNaFI4mjSpzhyd6X4nCuvsa6FdS5jbgjhArpqVliKFAE9quuF1s7W0kW_qI-kQGRT1LzFy9k_pCD64aHqXropLunD1a9mQkSo2DTloliXJK7Isng8UYlhteY2p8FHBnPN194attUjU70384tVJGEU',
      order_index: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
      routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      name: 'Sentadilla Trasera con Barra',
      target_muscle: 'Cuádriceps',
      secondary_muscles: ['Glúteos', 'Core'],
      target_sets: 4,
      target_reps_min: 6,
      target_reps_max: 8,
      target_weight: 110.0,
      rest_seconds: 150,
      notes: 'Profundidad paralela sólida • Barra alta con respiración diafragmática Valsalva',
      image_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAGM7wu9RZssz5EkK6yVKLZ_R1O16WkMRt39s0QyvMgC9dZNsxZ7vQgLnJ0H4HL0dwTA_4cWo23PUkBXWxclxfBrMr_XRSHD07JhnA5_LvnAArNn2eU2of_ysiYsKvyQ6hhuEjnggoUH7WGHNfF4rYF4CEtCscVHwKCEyntaKrnS5NtXcdMr520d83oTJGPRhbGOhxYqHXKy_5nomT_xHfrNXMyKsSbys7Z4okbYt-WIbNUzvgFR0nr',
      order_index: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
      routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      name: 'Press Militar Sentado con Mancuernas',
      target_muscle: 'Hombros',
      secondary_muscles: ['Deltoides Lateral', 'Estabilizadores'],
      target_sets: 3,
      target_reps_min: 10,
      target_reps_max: 12,
      target_weight: 24.0,
      rest_seconds: 90,
      notes: 'Banco a 75° para protección acromial • Trayectoria ligeramente curva natural',
      image_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDqgkFTCnkaNNDetryekLiFWdie5ipHZbOYAVSFUYYzRasWRDXhjAoRNe2B2aHxPS04LfNLZNWQ5bWVbw-x4RtIlxEZpfLciYXEm7ogJgekl1Pgs_mEwX8CZPyScTXxdiuivW8bTCWQfpdRG6AbL6OmEay4t52YdtksMw26959De1JECrfxpgEwMpMAKOB2pn2vtZF0ZZhr5UM0IY1Jd3CRG28mrNJXS4QH9ufqkfeTR_nLKpzTWm_o',
      order_index: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  private memoryWorkoutLogs: WorkoutLogEntity[] = [
    {
      id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a41',
      user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      exercise_id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
      set_number: 1,
      reps_completed: 10,
      weight_used: 82.5,
      rpe: 8.0,
      is_personal_record: false,
      log_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    },
    {
      id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a42',
      user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      exercise_id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
      set_number: 2,
      reps_completed: 9,
      weight_used: 85.0,
      rpe: 8.5,
      is_personal_record: false,
      log_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    },
    {
      id: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a43',
      user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      routine_id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      exercise_id: 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
      set_number: 3,
      reps_completed: 8,
      weight_used: 87.5,
      rpe: 9.0,
      is_personal_record: true,
      log_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    },
  ];

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: AppLoggerService
  ) {
    this.logger.setContext('SupabaseService');
  }

  onModuleInit(): void {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey =
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') ||
      this.configService.get<string>('SUPABASE_ANON_KEY');

    if (
      supabaseUrl &&
      supabaseKey &&
      !supabaseUrl.includes('placeholder') &&
      !supabaseKey.includes('placeholder')
    ) {
      try {
        this.client = createClient(supabaseUrl, supabaseKey);
        this.isConnectedToRemote = true;
        this.logger.log('onModuleInit -> Connected to live Supabase project successfully');
      } catch (err: unknown) {
        const error = err as Error;
        this.logger.warn(`onModuleInit -> Failed to connect to Supabase: ${error.message}. Running in local mock mode.`);
      }
    } else {
      this.logger.log('onModuleInit -> Running in local development mock storage mode until Supabase credentials are configured in .env');
    }
  }

  getClient(): SupabaseClient | null {
    return this.client;
  }

  isRemote(): boolean {
    return this.isConnectedToRemote;
  }

  // --- Users Repository Operations ---
  async getUsers(): Promise<UserEntity[]> {
    if (this.client) {
      const { data, error } = await this.client.from('users').select('*');
      if (!error && data) return data as UserEntity[];
    }
    return this.memoryUsers;
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    if (this.client) {
      const { data, error } = await this.client.from('users').select('*').eq('id', id).single();
      if (!error && data) return data as UserEntity;
    }
    return this.memoryUsers.find((u) => u.id === id) || null;
  }

  async createUser(dto: Partial<UserEntity>): Promise<UserEntity> {
    const newUser: UserEntity = {
      id: dto.id || crypto.randomUUID(),
      email: dto.email || '',
      name: dto.name || '',
      avatar_url: dto.avatar_url,
      weekly_goal_days: dto.weekly_goal_days ?? 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (this.client) {
      const { data, error } = await this.client.from('users').insert(newUser).select().single();
      if (!error && data) return data as UserEntity;
    }

    this.memoryUsers.push(newUser);
    return newUser;
  }

  // --- Routines Repository Operations ---
  async getRoutines(userId?: string): Promise<RoutineEntity[]> {
    if (this.client) {
      let query = this.client.from('routines').select('*');
      if (userId) query = query.eq('user_id', userId);
      const { data, error } = await query;
      if (!error && data) return data as RoutineEntity[];
    }

    if (userId) {
      return this.memoryRoutines.filter((r) => r.user_id === userId);
    }
    return this.memoryRoutines;
  }

  async getRoutineById(id: string): Promise<RoutineEntity | null> {
    if (this.client) {
      const { data, error } = await this.client.from('routines').select('*').eq('id', id).single();
      if (!error && data) return data as RoutineEntity;
    }
    return this.memoryRoutines.find((r) => r.id === id) || null;
  }

  async createRoutine(dto: Partial<RoutineEntity>): Promise<RoutineEntity> {
    const newRoutine: RoutineEntity = {
      id: dto.id || crypto.randomUUID(),
      user_id: dto.user_id || '',
      name: dto.name || '',
      description: dto.description,
      day_of_week: dto.day_of_week,
      frequency_days: dto.frequency_days ?? 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (this.client) {
      const { data, error } = await this.client.from('routines').insert(newRoutine).select().single();
      if (!error && data) return data as RoutineEntity;
    }

    this.memoryRoutines.push(newRoutine);
    return newRoutine;
  }

  // --- Exercises Repository Operations ---
  async getExercises(routineId?: string): Promise<ExerciseEntity[]> {
    if (this.client) {
      let query = this.client.from('exercises').select('*').order('order_index', { ascending: true });
      if (routineId) query = query.eq('routine_id', routineId);
      const { data, error } = await query;
      if (!error && data) return data as ExerciseEntity[];
    }

    if (routineId) {
      return this.memoryExercises.filter((e) => e.routine_id === routineId);
    }
    return this.memoryExercises;
  }

  async getExerciseById(id: string): Promise<ExerciseEntity | null> {
    if (this.client) {
      const { data, error } = await this.client.from('exercises').select('*').eq('id', id).single();
      if (!error && data) return data as ExerciseEntity;
    }
    return this.memoryExercises.find((e) => e.id === id) || null;
  }

  async createExercise(dto: Partial<ExerciseEntity>): Promise<ExerciseEntity> {
    const newExercise: ExerciseEntity = {
      id: dto.id || crypto.randomUUID(),
      routine_id: dto.routine_id || '',
      name: dto.name || '',
      target_muscle: dto.target_muscle || 'General',
      secondary_muscles: dto.secondary_muscles || [],
      target_sets: dto.target_sets ?? 4,
      target_reps_min: dto.target_reps_min ?? 8,
      target_reps_max: dto.target_reps_max ?? 10,
      target_weight: dto.target_weight ?? 0,
      rest_seconds: dto.rest_seconds ?? 90,
      notes: dto.notes,
      image_url: dto.image_url,
      order_index: dto.order_index ?? this.memoryExercises.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (this.client) {
      const { data, error } = await this.client.from('exercises').insert(newExercise).select().single();
      if (!error && data) return data as ExerciseEntity;
    }

    this.memoryExercises.push(newExercise);
    return newExercise;
  }

  // --- Workout Logs Repository Operations ---
  async getWorkoutLogs(filters?: { userId?: string; date?: string; routineId?: string }): Promise<WorkoutLogEntity[]> {
    if (this.client) {
      let query = this.client.from('workout_logs').select('*').order('created_at', { ascending: true });
      if (filters?.userId) query = query.eq('user_id', filters.userId);
      if (filters?.routineId) query = query.eq('routine_id', filters.routineId);
      if (filters?.date) query = query.eq('log_date', filters.date);
      const { data, error } = await query;
      if (!error && data) return data as WorkoutLogEntity[];
    }

    let results = this.memoryWorkoutLogs;
    if (filters?.userId) {
      results = results.filter((l) => l.user_id === filters.userId);
    }
    if (filters?.routineId) {
      results = results.filter((l) => l.routine_id === filters.routineId);
    }
    if (filters?.date) {
      results = results.filter((l) => l.log_date === filters.date);
    }
    return results;
  }

  async createWorkoutLog(dto: Partial<WorkoutLogEntity>): Promise<WorkoutLogEntity> {
    const newLog: WorkoutLogEntity = {
      id: dto.id || crypto.randomUUID(),
      user_id: dto.user_id || '',
      routine_id: dto.routine_id || '',
      exercise_id: dto.exercise_id || '',
      set_number: dto.set_number ?? 1,
      reps_completed: dto.reps_completed ?? 0,
      weight_used: dto.weight_used ?? 0,
      rpe: dto.rpe,
      is_personal_record: dto.is_personal_record ?? false,
      log_date: dto.log_date || new Date().toISOString().split('T')[0],
      notes: dto.notes,
      created_at: new Date().toISOString(),
    };

    if (this.client) {
      const { data, error } = await this.client.from('workout_logs').insert(newLog).select().single();
      if (!error && data) return data as WorkoutLogEntity;
    }

    this.memoryWorkoutLogs.push(newLog);
    return newLog;
  }
}
