import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { SupabaseService } from '../supabase/supabase.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const mockSupabaseService = {
      isRemote: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return service data with remote status', () => {
    const data = service.getData();
    expect(data.status).toBe('healthy');
    expect(data.supabase_connected).toBe(true);
  });
});
