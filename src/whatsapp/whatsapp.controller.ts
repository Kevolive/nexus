import { Controller, Get, Query } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsappController {
    constructor(private readonly whatsappService: WhatsappService) {}

    @Get('send')
    async sendMessage(@Query('to')to:string) {
        return this.whatsappService.sendMessage(to);
    }
}
