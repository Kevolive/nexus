import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

 const allowedOrigins = ['http://localhost:4200']; 

  // FORZAR EL MIDDLEWARE DE CORS DE EXPRESS
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  }));

  // FORZAR EL MANEJO DE OPTIONS (PRE-VUELO)
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      // El método OPTIONS debe responder solo con las cabeceras y un estado 204 (No Content) o 200 (OK)
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin || allowedOrigins[0]);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      return res.sendStatus(204); // Responde con éxito para el pre-vuelo
    }
    next();
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = process.env.PORT || 3000; 
  await app.listen(port, '0.0.0.0');
  console.log(`✅ App corriendo en puerto ${port}`);
}
bootstrap();


