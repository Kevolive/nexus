import { Body, Controller, Post } from '@nestjs/common';
import { FacturasService } from './facturas.service';

@Controller('facturas')
export class FacturasController {

    constructor(private readonly facturaService: FacturasService) { }

    @Post()
    crearFactura(@Body() data: any) {
        return this.facturaService.crearFactura(data);
    }
}
