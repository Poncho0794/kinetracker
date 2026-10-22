import 'reflect-metadata';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express, { Express } from 'express';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { AppLoggerService } from './common/logger/app-logger.service';

let server: Express;
let nestApp: INestApplication;

export async function createNestServer(
  expressInstance: Express
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      bufferLogs: true,
    }
  );

  const logger = app.get(AppLoggerService);
  logger.setContext('Bootstrap');
  app.useLogger(logger);

  // Security Headers via Helmet
  app.use(helmet());

  // CORS Configuration aligned with OWASP baseline
  const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:4200', 'http://127.0.0.1:4200'];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin, configured allowedOrigins, or Vercel preview/production domains
      const isVercelDomain =
        origin && (origin.endsWith('.vercel.app') || origin.endsWith('.vercel.sh'));
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*') ||
        isVercelDomain
      ) {
        callback(null, true);
      } else {
        logger.warn(
          `bootstrap -> CORS blocked request from unauthorized origin: ${origin}`
        );
        callback(new Error('No permitido por la política CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Global Prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  // Swagger / OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('KineTracker API')
    .setDescription(
      'API RESTful de alto rendimiento para KineTracker (seguimiento biomecánico de entrenamientos, rutinas, ejercicios y registros diarios en Supabase)'
    )
    .setVersion('1.0')
    .addTag('Usuarios', 'Gestión de atletas y perfiles')
    .addTag('Rutinas', 'Organización de rutinas y frecuencia semanal')
    .addTag('Ejercicios', 'Catálogo de ejercicios con métricas objetivo')
    .addTag('Registros de Entrenamiento', 'Logging diario de series, cargas, repeticiones y PRs')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  return app;
}

// Serverless handler for Vercel
export default async function handler(req: any, res: any) {
  if (!server) {
    server = express();
  }
  if (!nestApp) {
    nestApp = await createNestServer(server);
    await nestApp.init();
  }
  return server(req, res);
}

// Standalone listener for local development / long-running environments
async function bootstrap() {
  server = express();
  const app = await createNestServer(server);
  const port = process.env.PORT || 3000;
  const globalPrefix = 'api';
  await app.listen(port);

  const logger = app.get(AppLoggerService);
  logger.setContext('Bootstrap');
  logger.log(
    `bootstrap -> 🚀 KineTracker API iniciada en: http://localhost:${port}/${globalPrefix}`
  );
  logger.log(
    `bootstrap -> 📚 Documentación Swagger disponible en: http://localhost:${port}/${globalPrefix}/docs`
  );
}

if (!process.env.VERCEL) {
  bootstrap();
}

