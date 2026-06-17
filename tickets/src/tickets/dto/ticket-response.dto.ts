export class TicketResponseDto {
    id!: number;
    placa!: string;
    dni!: string;
    datosPersona?: string;
    idEspacio!: string;
    zona!: string;
    fechaHoraIngreso!: Date;
    fechaHoraSalida?: Date
    valorRecaudo?: number;
    activo!: boolean;
    tiempoHoras!: number;
    
}