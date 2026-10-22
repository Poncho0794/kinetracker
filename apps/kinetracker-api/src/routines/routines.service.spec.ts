import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesService } from './routines.service';
import { SupabaseService } from '../supabase/supabase.service';
import { AppLoggerService } from '../common/logger/app-logger.service';

describe('RoutinesService', () => {
  let service: RoutinesService;
  const mockRoutines = [
    {
      id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      user_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      name: 'Día 1 — Empuje e Hipertrofia',
      frequency_days: 4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  beforeEach(async () => {
    const mockSupabaseService = {
      getRoutines: jest.fn().mockResolvedValue(mockRoutines),
      getRoutineById: jest.fn().mockImplementation((id: string) => {
        const found = mockRoutines.find((r) => r.id === id);
        return Promise.resolve(found || null);
      }),
      createRoutine: jest.fn().mockImplementation((dto) =>
        Promise.resolve({
          id: 'routine-new-id',
          ...dto,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
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
        RoutinesService,
        { provide: SupabaseService, useValue: mockSupabaseService },
        { provide: AppLoggerService, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<RoutinesService>(RoutinesService);
  });

  it('should find all routines', async () => {
    const routines = await service.findAll();
    expect(routines).toHaveLength(1);
    expect(routines[0].name).toBe('Día 1 — Empuje e Hipertrofia');
  });

  it('should find one routine by id', async () => {
    const routine = await service.findOne('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22');
    expect(routine).toBeDefined();
    expect(routine.id).toBe('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22');
  });

  it('should throw NotFoundException when routine is not found', async () => {
    await expect(service.findOne('non-existent-id')).rejects.toThrow();
  });
});
