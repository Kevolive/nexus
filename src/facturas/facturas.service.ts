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

        //Encabezado
        doc.fontSize(25).text('Factura de compra', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Factura No: ${Date.now()}`, { align: 'right' });
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.moveDown(4);


        //Datos del cliente
        doc.fontSize(16).text('Datos del Cliente', { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Nombre: ${data.cliente}`);
        doc.moveDown(2);

        // Contenido de la factura
        const tableTop = doc.y;
        const itemX = 50;
        const descX = 150;
        const qtyX = 350;
        const priceX = 420;
        const totalX = 500;
        let totaly = doc.y + 20;


        doc.fontSize(12).text('Item', itemX, tableTop);
        doc.text('Descripción', descX, tableTop);
        doc.text('Cantidad', qtyX, tableTop);
        doc.text('P. Unitario', priceX, tableTop);
        doc.text('Total', totalX, tableTop);

        doc.moveDown();

        // Una fila de ejemplo
        const rowY = doc.y + 5;
        doc.text('1', itemX, rowY);
        doc.text(data.items, descX, rowY);
        doc.text(data.cantidad, qtyX, rowY);
        doc.text(`$${data.precioUnitario || data.precio_unitario}`, priceX, rowY);
        doc.text(`$${data.total}`, totalX, rowY);

        doc.moveDown(2);

        // TOTALES.

        doc.fontSize(12).text('Abono', 350, doc.y, { width: 70, align: 'right' });
        doc.text('Saldo', 450, doc.y, { width: 70, align: 'right' });

        doc.moveDown();
        doc.fontSize(12).text(`$${data.abono}`, 350, doc.y, { width: 70, align: 'right' });
        doc.text(`$${data.saldo}`, 450, doc.y, { width: 70, align: 'right' });


        doc.moveDown(3);




        // Generar el QR
        const infoQR = `Factura de ${data.cliente} - Items: ${data.items} -Descripción: ${data.descripcion} -Precio unitario: $${data.precioUnitario} -Cantidad: ${data.cantidad} - Abono: $${data.abono} - saldo: $${data.saldo} - Total: $${data.total}`;
        const qrDataUrl = await QRCode.toDataURL(infoQR);

        // Convertir base64 → Buffer
        const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, '');
        const qrBuffer = Buffer.from(qrBase64, 'base64');


        const pageWidth = doc.page.width;
        const qrSize = 200;
        const qrX = (pageWidth - qrSize) / 2; // Centrar el QR
        const qrY = doc.y; // Posición Y actual del documento


        // Agregar QR al PDF
        doc.moveDown();

        doc.image(qrBuffer, qrX, qrY, {
            fit: [qrSize, qrSize],
        });



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

    obtenerFacturas() {
        const carpeta= './facturas';
        if (!fs.existsSync(carpeta)) {
            return {mensaje: 'No hay facturas disponibles', facturas: []};
        }
const archivos = fs.readdirSync(carpeta);
return {mensaje: 'Facturas obtenidas correctamente', facturas: archivos};
    }
}
