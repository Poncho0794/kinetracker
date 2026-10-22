import { Injectable, LoggerService, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class AppLoggerService implements LoggerService {
  private contextName = 'KineTrackerAPI';

  setContext(context: string): void {
    this.contextName = context;
  }

  log(message: string, context?: string): void {
    const ctx = context || this.contextName;
    console.log(`[INFO] [${ctx}] ${message}`);
  }

  error(message: string, trace?: string, context?: string): void {
    const ctx = context || this.contextName;
    console.error(`[ERROR] [${ctx}] ${message}${trace ? `\nTrace: ${trace}` : ''}`);
  }

  warn(message: string, context?: string): void {
    const ctx = context || this.contextName;
    console.warn(`[WARN] [${ctx}] ${message}`);
  }

  debug?(message: string, context?: string): void {
    const ctx = context || this.contextName;
    console.debug(`[DEBUG] [${ctx}] ${message}`);
  }
}
