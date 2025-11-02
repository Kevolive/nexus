import { Body, Controller, Delete, Get, Param, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';


@ApiTags('Clientes')
@ApiBearerAuth('access-token')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }


  @UseGuards(JwtAuthGuard)
  @Get('protegida')
  findWithToken() {
    return 'Esta ruta está protegida mi amigo, y solo acceden usuarios con token válido'
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['admin'])
  @Get('admin')
  findForAdmin() {
    return 'Esta ruta solo la pueden ver los usuarios con rol de admin';
  }


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
