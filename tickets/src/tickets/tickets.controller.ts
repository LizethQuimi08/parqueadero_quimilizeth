import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('reservar')
  @ApiOperation({
    summary: 'Reservar un espacio',
    description:
      'Crea una reserva de espacio validando el usuario por DNI, el vehículo por placa y el espacio disponible en el microservicio de Zonas-Espacios. La reserva tiene una duración máxima de 5 minutos.',
  })
  @ApiBody({
    type: CreateTicketDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Reserva creada correctamente',
  })
  @ApiResponse({
    status: 400,
    description:
      'Datos inválidos, usuario no encontrado, vehículo no encontrado o espacio no disponible',
  })
  reservarEspacio(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.reservarEspacio(createTicketDto);
  }

  @Patch(':id/ocupar')
  @ApiOperation({
    summary: 'Ocupar espacio reservado',
    description:
      'Cambia un ticket reservado a activo y actualiza el estado del espacio a OCUPADO.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID del ticket reservado',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket activado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'El ticket no está reservado o la reserva expiró',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado',
  })
  ocuparEspacio(@Param('id') id: string) {
    return this.ticketsService.ocuparEspacio(id);
  }

  @Patch(':id/cerrar')
  @ApiOperation({
    summary: 'Cerrar ticket',
    description:
      'Finaliza un ticket activo, registra la salida, calcula o recibe el valor recaudado y libera el espacio.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID del ticket activo',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({
    type: UpdateTicketDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket cerrado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'El ticket no se encuentra activo',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado',
  })
  cerrarTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.cerrarTicket(id, updateTicketDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar tickets',
    description: 'Obtiene todos los tickets registrados en la base de datos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tickets obtenida correctamente',
  })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('activos')
  @ApiOperation({
    summary: 'Listar tickets activos',
    description:
      'Obtiene los tickets que se encuentran activos, es decir, tickets de vehículos que ya ocuparon un espacio.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tickets activos obtenida correctamente',
  })
  findActivos() {
    return this.ticketsService.findActivos();
  }

  @Get('reservados')
  @ApiOperation({
    summary: 'Listar tickets reservados',
    description:
      'Obtiene los tickets que se encuentran en estado reservado y aún no han sido ocupados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tickets reservados obtenida correctamente',
  })
  findReservados() {
    return this.ticketsService.findReservados();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar ticket por ID',
    description: 'Obtiene un ticket específico por su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID del ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket encontrado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar ticket',
    description: 'Elimina un ticket por su identificador.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID del ticket',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Ticket eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Ticket no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}