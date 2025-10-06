export declare class MailService {
    private transporter;
    constructor();
    sendContactMail(nombre: string, correo: string, mensaje: string): Promise<void>;
    sendInvoiceMail(to: string, pdfBuffer: Buffer): Promise<any>;
}
