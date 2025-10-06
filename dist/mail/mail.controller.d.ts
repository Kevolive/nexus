import { MailService } from './mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendContact(nombre: string, correo: string, mensaje: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
