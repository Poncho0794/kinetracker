import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from '../supabase/supabase.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockSupabaseService = {
      isRemote: jest.fn().mockReturnValue(false),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: SupabaseService,
          useValue: mockSupabaseService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe('getData', () => {
    it('should return API health status and welcome message', () => {
      const result = appController.getData();
      expect(result).toHaveProperty('status', 'healthy');
      expect(result).toHaveProperty('message', 'Bienvenido a KineTracker API');
      expect(result).toHaveProperty('supabase_connected', false);
    });
  });
});
