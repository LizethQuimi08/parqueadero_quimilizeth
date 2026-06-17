import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@ApiTags('Vehículos')
@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo vehículo',
    description:
      'Crea un nuevo vehículo en la base de datos. Soporta los tipos Auto, Moto y Camioneta.',
  })
  @ApiBody({
    type: CreateVehiculoDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Vehículo creado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'La placa ya existe',
  })
  create(@Body() createVehiculoDto: CreateVehiculoDto) {
    return this.vehiculoService.create(createVehiculoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los vehículos',
    description: 'Retorna todos los vehículos registrados en la base de datos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vehículos registrados',
  })
  findAll() {
    return this.vehiculoService.findAll();
  }

  @Get('placa/:placa')
  @ApiOperation({
    summary: 'Obtener un vehículo por placa',
    description: 'Busca un vehículo registrado en la base de datos usando su placa.',
  })
  @ApiParam({
    name: 'placa',
    type: 'string',
    description: 'Placa del vehículo',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehículo encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehículo no encontrado',
  })
  findByPlaca(@Param('placa') placa: string) {
    return this.vehiculoService.findByPlaca(placa);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un vehículo por ID',
    description: 'Busca un vehículo registrado en la base de datos usando su ID.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'ID único del vehículo',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehículo encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehículo no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.vehiculoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un vehículo',
    description: 'Actualiza parcialmente un vehículo existente en la base de datos.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'ID único del vehículo',
  })
  @ApiBody({
    type: UpdateVehiculoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Vehículo actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehículo no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  update(@Param('id') id: string, @Body() updateVehiculoDto: UpdateVehiculoDto) {
    return this.vehiculoService.update(id, updateVehiculoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un vehículo',
    description: 'Elimina un vehículo existente de la base de datos.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
    description: 'ID único del vehículo',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehículo eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Vehículo no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.vehiculoService.remove(id);
  }
}