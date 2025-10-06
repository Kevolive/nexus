"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturasService = void 0;
const common_1 = require("@nestjs/common");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs = __importStar(require("fs"));
const qrcode_1 = __importDefault(require("qrcode"));
let FacturasService = class FacturasService {
    async crearFactura(data) {
        const nombreArchivo = `factura_${Date.now()}.pdf`;
        const rutaArchivo = `./facturas/${nombreArchivo}`;
        if (!fs.existsSync('./facturas')) {
            fs.mkdirSync('./facturas');
        }
        const doc = new pdfkit_1.default();
        const stream = fs.createWriteStream(rutaArchivo);
        doc.pipe(stream);
        doc.fontSize(25).text('Factura de compra', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Factura No: ${Date.now()}`, { align: 'right' });
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
        doc.moveDown(4);
        doc.fontSize(16).text('Datos del Cliente', { underline: true });
        doc.moveDown();
        doc.fontSize(12).text(`Nombre: ${data.cliente}`);
        doc.moveDown(2);
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
        const rowY = doc.y + 5;
        doc.text('1', itemX, rowY);
        doc.text(data.items, descX, rowY);
        doc.text(data.cantidad, qtyX, rowY);
        doc.text(`$${data.precioUnitario || data.precio_unitario}`, priceX, rowY);
        doc.text(`$${data.total}`, totalX, rowY);
        doc.moveDown(2);
        doc.fontSize(12).text('Abono', 350, doc.y, { width: 70, align: 'right' });
        doc.text('Saldo', 450, doc.y, { width: 70, align: 'right' });
        doc.moveDown();
        doc.fontSize(12).text(`$${data.abono}`, 350, doc.y, { width: 70, align: 'right' });
        doc.text(`$${data.saldo}`, 450, doc.y, { width: 70, align: 'right' });
        doc.moveDown(3);
        const infoQR = `Factura de ${data.cliente} - Items: ${data.items} -Descripción: ${data.descripcion} -Precio unitario: $${data.precioUnitario} -Cantidad: ${data.cantidad} - Abono: $${data.abono} - saldo: $${data.saldo} - Total: $${data.total}`;
        const qrDataUrl = await qrcode_1.default.toDataURL(infoQR);
        const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, '');
        const qrBuffer = Buffer.from(qrBase64, 'base64');
        const pageWidth = doc.page.width;
        const qrSize = 200;
        const qrX = (pageWidth - qrSize) / 2;
        const qrY = doc.y;
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
};
exports.FacturasService = FacturasService;
exports.FacturasService = FacturasService = __decorate([
    (0, common_1.Injectable)()
], FacturasService);
//# sourceMappingURL=facturas.service.js.map