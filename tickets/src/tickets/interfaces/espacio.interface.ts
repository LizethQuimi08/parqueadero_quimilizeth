export interface Espacio{
    id: string;
    codigo: string;  //validar nombre
    zona: string;
    disponible: boolean;
    tipo?: string;
    estado: string;
}