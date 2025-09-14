import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ClientesController } from './clientes/clientes.controller';
import { ClientesService } from './clientes/clientes.service';
import { ClientesModule } from './clientes/clientes.module';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MailModule, ClientesModule, DatabaseModule, AuthModule],
  controllers: [AppController, ClientesController, AuthController],
  providers: [AppService, ClientesService],
})
export class AppModule {}
