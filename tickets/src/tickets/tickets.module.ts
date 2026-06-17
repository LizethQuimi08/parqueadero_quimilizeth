import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { HttpClientService } from './common/http-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsController],
  providers: [TicketsService, HttpClientService],
})
export class TicketsModule {}