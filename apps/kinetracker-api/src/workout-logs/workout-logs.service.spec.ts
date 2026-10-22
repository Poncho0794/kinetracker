import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutLogsService } from './workout-logs.service';
import { SupabaseService } from '../supabase/supabase.service';
import { AppLoggerService } from '../common/logger/app-logger.service';

describe('WorkoutLogsService', () => {
  let service: WorkoutLogsService;

  beforeEach(async () => {
    const mockSupabaseService = {
      getWorkoutLogs: jest.fn().mockResolvedValue([
        {
          id: 'log-1',
          user_id: 'user-1',
          routine_id: 'routine-1',
          exercise_id: 'exercise-1',
          set_number: 1,
          reps_completed: 10,
          weight_used: 82.5,
          log_date: '2026-10-22',
        },
      ]),
      createWorkoutLog: jest.fn().mockImplementation((dto) =>
        Promise.resolve({
          id: 'log-new',
          ...dto,
          created_at: new Date().toISOString(),
        })
      ),
    };

    const mockLogger = {
      setContext: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutLogsService,
        { provide: SupabaseService, useValue: mockSupabaseService },
        { provide: AppLoggerService, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<WorkoutLogsService>(WorkoutLogsService);
  });

  it('should find all workout logs with filters', async () => {
    const logs = await service.findAll({ userId: 'user-1' });
    expect(logs).toHaveLength(1);
    expect(logs[0].set_number).toBe(1);
    expect(logs[0].reps_completed).toBe(10);
  });

  it('should create a new workout log', async () => {
    const newLog = await service.create({
      user_id: 'user-1',
      routine_id: 'routine-1',
      exercise_id: 'exercise-1',
      set_number: 2,
      reps_completed: 8,
      weight_used: 85.0,
      rpe: 8.5,
      is_personal_record: true,
      log_date: '2026-10-22',
    });

    expect(newLog).toBeDefined();
    expect(newLog.id).toBe('log-new');
    expect(newLog.set_number).toBe(2);
    expect(newLog.is_personal_record).toBe(true);
  });
});
