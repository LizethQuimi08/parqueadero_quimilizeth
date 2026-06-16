import { IsNumber, IsOptional } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  @IsNumber()
  valorRecaudado?: number;
}