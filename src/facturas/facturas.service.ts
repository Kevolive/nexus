import { Injectable } from '@nestjs/common';

@Injectable()
export class FacturasService {

    crearFactura(data: any) {
        // Lógica para crear una factura
        //TODO
        return { mensaje: 'Factura creada', data };
    }
}
