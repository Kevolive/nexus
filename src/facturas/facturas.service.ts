import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import  QRCode from 'qrcode';

@Injectable()
export class FacturasService {

    async crearFactura(data: any) {
        // Lógica para crear una factura
        //Nombre del archivo PDF
        const nombreArchivo = `factura_${Date.now()}.pdf`;
        const rutaArchivo = `./facturas/${nombreArchivo}`;


        //Se crea el directorio
        if (!fs.existsSync('./facturas')) {
            fs.mkdirSync('./facturas');
        }
        //Se crea el archivo pdf

        const doc = new PDFDocument();

        //Guardar el archivo en el sistema de archivos
        const stream = fs.createWriteStream(rutaArchivo);
        doc.pipe(stream);

        //Contenido de la factura
        doc.fontSize(25).text('Factura de compra', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Cliente: ${data.cliente}`);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.moveDown();
        doc.text('Gracias por su compra!', { align: 'center' });


        //Generar el QR
        const infoQR = `Factura de ${data.cliente} - Total: $${data.total}`
        const qrDataUrl = await QRCode.toDataUrl(infoQR);

        //Convertir a base64 -> Buffer
        const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
        const qrBuffer = Buffer.from(qrBase64, 'base64');

        //Agregar el QR al PDF
        doc.fontSize(10).text('Escanea el QR para más información', { align: 'center' });
        doc.image(qrBuffer, {
            fit: [150, 150],
            align: 'center',
            valign: 'center'

        }
        );
        doc.moveDown();
        doc.text('Nexus - Tu tienda en línea. ¡GRACIAS POR TU COMPRA!', { align: 'center' });
        

        //Finalizar el documento
        doc.end();


        //Retornar respuesta cuando termine de escribir el archivo

        return new Promise((resolve) => {
            stream.on('finish', () => {
                resolve({
                    mensaje: 'Factura generada correctamente',
                    ruta: rutaArchivo
                });
            });



        })


    }
}
