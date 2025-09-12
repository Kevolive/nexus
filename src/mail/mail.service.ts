import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {

    private transporter;


    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, //correo
                pass: process.env.EMAIL_PASS, //contraseña de aplicacion
            },
        });
    }

    async sendContactMail(nombre: string, correo: string, mensaje: string) {
        await this.transporter.sendMail({
            from: `"Portafolio" <${process.env.EMAIL_USER}>`, // sender address
            to: process.env.EMAIL_TO, // dirección de correo para recibir el mensaje
            subject: 'Nuevo mensaje de contacto',
            text: `Nombre: $nombre\nCorreo: ${correo}\nMensaje: ${mensaje}`,
            html: `<h3>Nuevo mensaje de contacto</h3>
            <p>Nombre: ${nombre}</p>
            <p>Correo: ${correo}</p>
            <p>Mensaje: ${mensaje}</p>
            `
        })

    }

    async sendInvoiceMail(to: string, pdfBuffer: Buffer) {
        return this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: 'Tu factura',
            text: 'Adjunto encontrarás tu factura.',
            attachments: [
                {
                    filename: 'Factura.pdf',
                    content: pdfBuffer,

                },
            ],
        })

    }
}