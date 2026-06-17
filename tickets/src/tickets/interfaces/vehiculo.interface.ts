export interface Vehiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  anio: number;
  clasificacion: string;
  tipo: string;

  numeroPuertas?: number;
  capacidadMaletero?: number;

  tipoMotocicleta?: string;

  cabina?: string;
  capacidadCarga?: number;
}