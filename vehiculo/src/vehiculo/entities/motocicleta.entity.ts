import { ChildEntity, Column } from "typeorm";
import { Vehiculo } from "./vehiculo.entity";

export enum TipoMotocicleta {
    DEPORTIVA = 'Deportiva',
    CRUCERO = 'Crucero',
    NAKED = 'Naked',
    SCOOTER = 'Scooter',
    ENDURO = 'Enduro',
}

@ChildEntity('Moto')
export class Motocicleta extends Vehiculo {

    @Column()
    tipoMotocicleta!: TipoMotocicleta;

    getTipo(): string {
        return 'Moto';
    }
}