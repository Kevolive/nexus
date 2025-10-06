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
import { FacturasModule } from './facturas/facturas.module';
import { WhatsappService } from './whatsapp/whatsapp.service';
import { WhatsappController } from './whatsapp/whatsapp.controller';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
  }),
  MailModule, ClientesModule, DatabaseModule, AuthModule, FacturasModule, WhatsappModule],
  controllers: [AppController, ClientesController, AuthController, WhatsappController],
  providers: [AppService, ClientesService, WhatsappService],
})
export class AppModule {}
