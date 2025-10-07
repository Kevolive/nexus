export declare class FacturasService {
    crearFactura(data: any): Promise<unknown>;
    obtenerFacturas(): {
        mensaje: string;
        facturas: string[];
    };
}
