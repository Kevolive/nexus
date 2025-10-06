import { WhatsappService } from './whatsapp.service';
export declare class WhatsappController {
    private readonly whatsappService;
    constructor(whatsappService: WhatsappService);
    sendMessage(body: {
        phone: string;
        message: string;
    }): Promise<any>;
}
