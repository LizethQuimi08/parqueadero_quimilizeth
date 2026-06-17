import { Clasificacion } from "../entities/vehiculo.entity";
import { TipoMotocicleta } from "../entities/motocicleta.entity";

export class ResponseVehiculoDto {
  id!: string;
  placa!: string;
  marca!: string;
  modelo!: string;
  color!: string;
  anio!: number;
  clasificacion!: Clasificacion;
  tipo!: string;

  numeroPuertas?: number;
  capacidadMaletero?: number;

  tipoMotocicleta?: string;

  cabina?: string;
  capacidadCarga?: number;
}