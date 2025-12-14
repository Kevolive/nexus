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
            fecha: String(createClienteDto.fecha),
            tipoPago: createClienteDto.tipoPago ?? null
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

    findByMonth(year: number, month: number) {
        
            const start = new Date(year, month - 1, 1);
            const end = new Date(year, month, 1);

            return this.prisma.cliente.findMany({
                where: {
                    fecha: {
                        gte: start,
                        lt: end,
                    },
                },
            });
        }
    
    async getGanancias(year: number, month: number) {
    const start = new Date(year, month - 1, 1);
    const end   = new Date(year, month, 1);

    const registros = await this.prisma.cliente.findMany({
        where: {
            fecha: {
                gte: start,
                lt: end
            }
        },
        select: { precioTotal: true }
    });

    const total = registros.reduce((sum, c) => sum + c.precioTotal, 0);

    return { total };
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
