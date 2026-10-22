import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AppService {
  constructor(private readonly supabaseService: SupabaseService) {}

  getData() {
    return {
      message: 'Bienvenido a KineTracker API',
      status: 'healthy',
      supabase_connected: this.supabaseService.isRemote(),
      version: '1.0.0',
    };
  }
}
