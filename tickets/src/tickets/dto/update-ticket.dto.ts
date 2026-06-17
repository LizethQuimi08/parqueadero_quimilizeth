import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTicketDto {
  @ApiPropertyOptional({
    description: 'Valor recaudado al cerrar el ticket. Si no se envía, el sistema puede calcularlo según la tarifa configurada.',
    example: 2.5,
  })
  @IsOptional()
  @IsNumber()
  valorRecaudado?: number;
}