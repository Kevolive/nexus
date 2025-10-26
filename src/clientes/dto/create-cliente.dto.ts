// create-cliente.dto.ts
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

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
    cantidad: number;

    @IsString()
    direccion: string;

    @IsString()
    celular: string;

    @IsNumber()
    precioUnitario: number;

    @IsNumber()
    precioTotal: number;

    
    @IsOptional()
    @IsString()
    imagen: string;

    @IsDateString()
    fecha: string;
}
