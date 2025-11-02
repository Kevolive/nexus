// create-cliente.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    nombre: string;

    @IsOptional()
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

    @IsOptional()
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

    @IsString()
    fecha: string;
    
}
