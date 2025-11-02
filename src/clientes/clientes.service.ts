import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';



@Injectable()
export class ClientesService {

    constructor(private prisma: PrismaService) { }

    create(createClienteDto: CreateClienteDto) {
        // Convertir los campos numéricos explícitamente
        console.log('🔍 CreateClienteDto recibido:', createClienteDto);
        console.log('🔍 Fecha en DTO:', createClienteDto.fecha, 'Tipo:', typeof createClienteDto.fecha);
        const data = {
            ...createClienteDto,
            cantidad: Number(createClienteDto.cantidad),
            precioUnitario: Number(createClienteDto.precioUnitario),
            precioTotal: Number(createClienteDto.precioTotal),
            fecha: String(createClienteDto.fecha)
        };


        delete (data as any).id; // Por si acaso viene id

        console.log('📤 Data para Prisma:', data);
        return this.prisma.cliente.create({ data });
    }

    findAll() {
        return this.prisma.cliente.findMany();
    }

    findOne(id: number) {
        return this.prisma.cliente.findUnique({ where: { id } });
    }

    update(id: number, data: UpdateClienteDto) {
        return this.prisma.cliente.update({
            where: { id },
            data
        });
    }

    remove(id: number) {
        return this.prisma.cliente.delete({ where: { id } });
    }
}
