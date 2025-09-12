import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ClientesController } from './clientes/clientes.controller';
import { ClientesService } from './clientes/clientes.service';
import { ClientesModule } from './clientes/clientes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MailModule, ClientesModule, DatabaseModule],
  controllers: [AppController, ClientesController],
  providers: [AppService, ClientesService],
})
export class AppModule {}
