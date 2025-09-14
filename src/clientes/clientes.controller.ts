import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('clientes')
export class ClientesController {
  @UseGuards(JwtAuthGuard)
  @Get()
  findWithToken() {
    return 'Esta ruta está protegida i amigo, y solo acceden usuarios con token válido'
  }
  constructor(private readonly clientesService: ClientesService) { }


  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll() {
return this.clientesService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.clientesService.findOne(+id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
  return this.clientesService.update(+id, updateClienteDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.clientesService.remove(+id);
}
}
