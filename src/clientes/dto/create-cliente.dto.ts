// create-cliente.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsString()
    tecnica: string;

    @IsNumber()
    cantidad: string;

    @IsString()
    direccion: string;

    @IsString()
    celular: string;

    @IsNumber()
    precioUnitario: number;

    @IsNumber()
    precioTotal: number;
}
