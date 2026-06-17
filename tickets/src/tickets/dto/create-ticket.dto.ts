import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Placa del vehículo registrado en el microservicio de Vehículos',
    example: 'ABC-1234',
  })
  @IsString()
  @IsNotEmpty()
  placa!: string;

  @ApiProperty({
    description: 'DNI o cédula del usuario registrado en el microservicio de Usuarios',
    example: '1723456789',
  })
  @IsString()
  @IsNotEmpty()
  dni!: string;

  @ApiProperty({
    description: 'ID del espacio registrado en el microservicio de Zonas-Espacios',
    example: '1813b627-90c3-45f1-8549-369812b3e2b5',
  })
  @IsUUID()
  @IsNotEmpty()
  idEspacio!: string;

  @ApiProperty({
    description: 'Nombre de la zona donde se encuentra el espacio',
    example: 'ZONA A',
  })
  @IsString()
  @IsNotEmpty()
  zona!: string;
}