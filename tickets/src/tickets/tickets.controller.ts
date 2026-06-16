import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('reservar')
  reservarEspacio(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.reservarEspacio(createTicketDto);
  }

  @Patch(':id/ocupar')
  ocuparEspacio(@Param('id') id: string) {
    return this.ticketsService.ocuparEspacio(id);
  }

  @Patch(':id/cerrar')
  cerrarTicket(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.cerrarTicket(id, updateTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  @Get('activos')
  findActivos() {
    return this.ticketsService.findActivos();
  }

  @Get('reservados')
  findReservados() {
    return this.ticketsService.findReservados();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}