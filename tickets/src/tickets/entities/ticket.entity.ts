import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';

export enum EstadoTicket {
  RESERVADO = 'RESERVADO',
  ACTIVO = 'ACTIVO',
  CERRADO = 'CERRADO',
  CANCELADO = 'CANCELADO',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  placa!: string;

  @Column()
  dni!: string;

  @Column()
  idEspacio!: string;

  @Column()
  zona!: string;

  @Column({ type: 'timestamp', nullable: true })
  fechaHoraIngreso?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaHoraSalida?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaHoraReserva?: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaExpiracionReserva?: Date;

  @Column({
    type: 'enum',
    enum: EstadoTicket,
    default: EstadoTicket.RESERVADO,
  })
  estado!: EstadoTicket;

  @Column({ default: false })
  activo!: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  valorRecaudado!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}