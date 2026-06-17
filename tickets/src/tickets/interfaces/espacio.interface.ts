export interface Espacio {
  id: string;
  nombre: string;
  descripcion?: string;
  tipo: 'CUBIERTO' | 'DESCUBIERTO' | 'ACCESIBLE';
  activo: boolean;
  nombreZona: string;
  idZona: string;
  estado: 'DISPONIBLE' | 'OCUPADO' | 'RESERVADO' | 'MANTENIMIENTO';
  fechaCreacion?: string;
  fechaActualizacion?: string;
}