import {BadRequestException, Injectable, Logger, NotFoundException,} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket, EstadoTicket } from './entities/ticket.entity';
import { HttpClientService } from './common/http-client.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Persona } from './interfaces/persona.interface';
import { Vehiculo } from './interfaces/vehiculo.interface';
import { Espacio } from './interfaces/espacio.interface';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

  private readonly personaUrl: string;
  private readonly espacioUrl: string;
  private readonly tarifaPorHora: number;
  private readonly vehiculoUrl: string;

  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly httpClient: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    this.personaUrl = this.configService.get<string>('MS_PERSONAS')!;
    this.espacioUrl = this.configService.get<string>('MS_ZONAS')!;
    this.vehiculoUrl = this.configService.get<string>('MS_VEHICULOS')!;
    this.tarifaPorHora = Number(this.configService.get<number>('TARIFA_HORA', 2.5));
  }

  async reservarEspacio(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const persona = await this.validarPersona(createTicketDto.dni);

    if (!persona) {
      throw new BadRequestException(
        `Persona con DNI ${createTicketDto.dni} no encontrada`,
      );
    }

    const vehiculo = await this.validarPlaca(createTicketDto.placa);

    if (!vehiculo) {
      throw new BadRequestException(
        `Vehículo con placa ${createTicketDto.placa} no encontrado`,
      );
    }

    const espacioDisponible = await this.validarEspacioDisponible(
      createTicketDto.idEspacio,
      createTicketDto.zona,
    );

    if (!espacioDisponible) {
      throw new BadRequestException(
        `El espacio ${createTicketDto.idEspacio} no está disponible o no existe`,
      );
    }

    await this.validarTicketActivoOReservado(createTicketDto.placa);

    const fechaReserva = new Date();
    const fechaExpiracion = new Date(fechaReserva.getTime() + 5 * 60 * 1000);

    const ticket = this.ticketRepository.create({
      placa: createTicketDto.placa,
      dni: createTicketDto.dni,
      idEspacio: createTicketDto.idEspacio,
      zona: createTicketDto.zona,
      fechaHoraReserva: fechaReserva,
      fechaExpiracionReserva: fechaExpiracion,
      estado: EstadoTicket.RESERVADO,
      activo: false,
      valorRecaudado: 0,
    });

    const ticketGuardado = await this.ticketRepository.save(ticket);

    //Metodo para reservar un ticket con tiempo de expiracion, se programa una tarea para liberar el espacio si no se ocupa en 5 minutos

    await this.reservarEspacioEnMicroservicio(
      createTicketDto.idEspacio,
      createTicketDto.zona,
    );

    this.programarLiberacionReserva(ticketGuardado.id);

    this.logger.log(
      `Reserva creada para la placa ${ticketGuardado.placa}. Expira en 5 minutos.`,
    );

    return ticketGuardado;
  }

  async ocuparEspacio(id: string): Promise<Ticket> {
    const ticket = await this.findOne(id);

    if (ticket.estado !== EstadoTicket.RESERVADO) {
      throw new BadRequestException(
        `El ticket no está en estado RESERVADO`,
      );
    }

    if (
      ticket.fechaExpiracionReserva &&
      new Date() > ticket.fechaExpiracionReserva
    ) {
      await this.liberarReservaVencida(ticket);
      throw new BadRequestException(
        `La reserva venció. El espacio fue liberado.`,
      );
    }

    ticket.estado = EstadoTicket.ACTIVO;
    ticket.activo = true;
    ticket.fechaHoraIngreso = new Date();

    const ticketActualizado = await this.ticketRepository.save(ticket);

    await this.ocuparEspacioEnMicroservicio(ticket.idEspacio, ticket.zona);

    this.logger.log(
      `El espacio ${ticket.idEspacio} fue ocupado por la placa ${ticket.placa}`,
    );

    return ticketActualizado;
  }

  async cerrarTicket(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    const ticket = await this.findOne(id);

    if (ticket.estado !== EstadoTicket.ACTIVO) {
      throw new BadRequestException(
        `Solo se puede cerrar un ticket en estado ACTIVO`,
      );
    }

    if (!ticket.fechaHoraIngreso) {
      throw new BadRequestException(
        `El ticket no tiene fecha de ingreso registrada`,
      );
    }

    const fechaSalida = new Date();
    const horas = this.calcularHoras(ticket.fechaHoraIngreso, fechaSalida);
    const costo = horas * this.tarifaPorHora;

    ticket.activo = false;
    ticket.estado = EstadoTicket.CERRADO;
    ticket.fechaHoraSalida = fechaSalida;
    ticket.valorRecaudado = updateTicketDto.valorRecaudado ?? costo;

    const ticketCerrado = await this.ticketRepository.save(ticket);

    await this.liberarEspacioEnMicroservicio(ticket.idEspacio, ticket.zona);

    this.logger.log(
      `Ticket ${ticket.id} cerrado. Valor recaudado: ${ticket.valorRecaudado}`,
    );

    return ticketCerrado;
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }

    return ticket;
  }

  async findActivos(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        estado: EstadoTicket.ACTIVO,
        activo: true,
      },
      order: { fechaHoraIngreso: 'DESC' },
    });
  }

  async findReservados(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: {
        estado: EstadoTicket.RESERVADO,
      },
      order: { fechaHoraReserva: 'DESC' },
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const ticket = await this.findOne(id);

    if (ticket.estado === EstadoTicket.RESERVADO) {
      await this.liberarEspacioEnMicroservicio(ticket.idEspacio, ticket.zona);
    }

    ticket.estado = EstadoTicket.CANCELADO;
    ticket.activo = false;

    await this.ticketRepository.save(ticket);

    return {
      message: `Ticket ${id} cancelado correctamente`,
    };
  }

  private async validarPersona(dni: string): Promise<Persona | null> {
    try {
      const url = `${this.personaUrl}/${dni}`;
      return await this.httpClient.get<Persona>(url);
    } catch (error) {
      this.logger.error(`Error al validar persona ${dni}: ${error}`);
      return null;
    }
  }

  private async validarPlaca(placa: string): Promise<Vehiculo | null> {
    try {
      const url = `${this.vehiculoUrl}/${placa}`;
      return await this.httpClient.get<Vehiculo>(url);
    } catch (error) {
      this.logger.error(`Error al validar placa ${placa}: ${error}`);
      return null;
    }
  }

  private async validarEspacioDisponible(
    idEspacio: string,
    zona: string,
  ): Promise<Espacio | null> {
    try {
      const url = `${this.espacioUrl}/disponibles?zona=${zona}`;
      const espacios = await this.httpClient.get<Espacio[]>(url);

      return (
        espacios.find(
          (espacio) =>
            espacio.id === idEspacio && espacio.estado === 'DISPONIBLE',
        ) || null
      );
    } catch (error) {
      this.logger.error(`Error al validar espacio ${idEspacio}: ${error}`);
      return null;
    }
  }

  private async validarTicketActivoOReservado(placa: string): Promise<void> {
    const ticketExistente = await this.ticketRepository.findOne({
      where: [
        {
          placa,
          estado: EstadoTicket.ACTIVO,
        },
        {
          placa,
          estado: EstadoTicket.RESERVADO,
        },
      ],
    });

    if (ticketExistente) {
      throw new BadRequestException(
        `Ya existe un ticket activo o reservado para la placa ${placa}`,
      );
    }
  }

  private calcularHoras(ingreso: Date, salida: Date): number {
    const diffMs = salida.getTime() - ingreso.getTime();
    const diffHoras = diffMs / (1000 * 60 * 60);

    return Math.ceil(diffHoras);
  }

  private programarLiberacionReserva(ticketId: string): void {
    setTimeout(async () => {
      try {
        const ticket = await this.ticketRepository.findOne({
          where: { id: ticketId },
        });

        if (!ticket) return;

        if (ticket.estado === EstadoTicket.RESERVADO) {
          await this.liberarReservaVencida(ticket);
        }
      } catch (error) {
        this.logger.error(
          `Error al liberar automáticamente la reserva ${ticketId}: ${error}`,
        );
      }
    }, 5 * 60 * 1000);
  }

  private async liberarReservaVencida(ticket: Ticket): Promise<void> {
    ticket.estado = EstadoTicket.CANCELADO;
    ticket.activo = false;

    await this.ticketRepository.save(ticket);

    await this.liberarEspacioEnMicroservicio(ticket.idEspacio, ticket.zona);

    this.logger.warn(
      `Reserva vencida. Se liberó el espacio ${ticket.idEspacio}`,
    );
  }

  private async reservarEspacioEnMicroservicio(
    idEspacio: string,
    zona: string,
  ): Promise<void> {
    const url = `${this.espacioUrl}/${idEspacio}/reservar`;

    await this.httpClient.patch(url, {
      zona,
      estado: 'RESERVADO',
    });
  }

  private async ocuparEspacioEnMicroservicio(
    idEspacio: string,
    zona: string,
  ): Promise<void> {
    const url = `${this.espacioUrl}/${idEspacio}/ocupar`;

    await this.httpClient.patch(url, {
      zona,
      estado: 'OCUPADO',
    });
  }

  private async liberarEspacioEnMicroservicio(
    idEspacio: string,
    zona: string,
  ): Promise<void> {
    const url = `${this.espacioUrl}/${idEspacio}/liberar`;

    await this.httpClient.patch(url, {
      zona,
      estado: 'DISPONIBLE',
    });
  }
}