import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import QRCode from 'qrcode';

@Injectable()
export class FacturasService {
    async crearFactura(data: any) {
        const nombreArchivo = `factura_${Date.now()}.pdf`;
        const rutaArchivo = `./facturas/${nombreArchivo}`;

        if (!fs.existsSync('./facturas')) {
            fs.mkdirSync('./facturas');
        }

        const doc = new PDFDocument();
        const stream = fs.createWriteStream(rutaArchivo);
        doc.pipe(stream);

        // Contenido de la factura
        doc.fontSize(25).text('Factura de compra', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Cliente: ${data.cliente}`);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.text(`Total: $${data.total}`);
        doc.moveDown();
        doc.text('Gracias por su compra!', { align: 'center' });

        // Generar el QR
        const infoQR = `Factura de ${data.cliente} - Total: $${data.total}`;
        const qrDataUrl = await QRCode.toDataURL(infoQR);

        // Convertir base64 → Buffer
        const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, '');
        const qrBuffer = Buffer.from(qrBase64, 'base64');

        // Agregar QR al PDF
        doc.moveDown();
        doc.fontSize(10).text('Escanea el QR para más información', { align: 'center' });
        doc.image(qrBuffer, {
            fit: [150, 150],
            align: 'center',
            valign: 'center',
        });

        doc.moveDown();
        doc.text('Nexus - Tu tienda en línea. ¡GRACIAS POR TU COMPRA!', { align: 'center' });

        doc.end();

        return new Promise((resolve) => {
            stream.on('finish', () => {
                resolve({
                    mensaje: 'Factura generada correctamente',
                    ruta: rutaArchivo,
                });
            });
        });
    }
}
