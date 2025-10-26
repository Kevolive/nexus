// create-cliente.dto.ts
import { IsString, IsNumber, IsDataURI, IsDate, IsOptional } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;

    @IsString()
    tecnica: string;

    @IsString()
    tipo: string;

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

    @IsDataURI()
    imagen: string;

    @IsDate()
    fecha: string;

    @IsOptional()
    @IsString()
    image?: string;
}
