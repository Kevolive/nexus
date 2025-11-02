import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS con la forma nativa de NestJS
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // ✅ Validación global de DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Escuchar en Render (usa 0.0.0.0 y puerto dinámico)
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`✅ App corriendo correctamente en puerto ${port}`);

  console.log("Vamos");
  
}

bootstrap();
