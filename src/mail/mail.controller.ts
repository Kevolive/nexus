import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('contact')
    async sendContact(
        @Body('nombre') nombre: string,
        @Body('correo') correo: string,
        @Body('mensaje') mensaje: string,
    ) {
        await this.mailService
        return { success: true, message: 'Correo enviado correctamente' };
    }
}
