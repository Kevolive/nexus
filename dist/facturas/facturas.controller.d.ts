import { FacturasService } from './facturas.service';
export declare class FacturasController {
    private readonly facturaService;
    constructor(facturaService: FacturasService);
    crearFactura(data: any): Promise<unknown>;
}
