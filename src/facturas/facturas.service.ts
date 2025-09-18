import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

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
        doc.fontSize(25).text('Factura', { align: 'center' });
        doc.moveDown();
        doc.fontSice(12).text(`Cliente: ${data.cliente}`);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.moveDown();
        doc.text('Gracias por su compra!', { align: 'center' });

        //Finalizar el documento
        doc.end();


        //Retornar respuesta cuando termine de escribir el archivo

        return new Promise((resolve) => {
            stream.on('finish', () => {
                resolve({
                    mensaje: 'Factura creada',
                    ruta: rutaArchivo
                });
            });
            
            

        })

        
    }
}
