import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: ['http://localhost:4200', 'https://nexus-nwgg.onrender.com'],
    credentials: true,
  }));

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://nexus-nwgg.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`✅ App corriendo en puerto ${port}`);
}
bootstrap();
function cors(arg0: { origin: string[]; credentials: boolean; }): any {
  throw new Error('Function not implemented.');
}

