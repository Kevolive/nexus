// create-cliente.dto.ts
import { Type } from 'class-transformer';
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

    @Type(() => Number)
    @IsNumber()
    cantidad: number;

    @IsString()
    direccion: string;

    @IsString()
    celular: string;

    @Type(() => Number)
    @IsNumber()
    precioUnitario: number;
    
    @Type(() => Number)
    @IsNumber()
    precioTotal: number;

    
    @IsOptional()
    @IsString()
    imagen: string;

    @IsDateString()
    fecha: string;
}
