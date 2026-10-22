import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { AppLoggerService } from './common/logger/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

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
      // Allow requests with no origin (like mobile apps, curl, postman) or from allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`bootstrap -> CORS blocked request from unauthorized origin: ${origin}`);
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

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`bootstrap -> 🚀 KineTracker API iniciada en: http://localhost:${port}/${globalPrefix}`);
  logger.log(`bootstrap -> 📚 Documentación Swagger disponible en: http://localhost:${port}/${globalPrefix}/docs`);
}

bootstrap();
