import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Vehiculo } from './entities/vehiculo.entity';
import { Auto } from './entities/auto.entity';
import { Motocicleta } from './entities/motocicleta.entity';
import { Camioneta } from './entities/camioneta.entity';


@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
    @InjectRepository(Auto)
    private readonly autoRepository: Repository<Auto>,
    @InjectRepository(Motocicleta)
    private readonly motocicletaRepository: Repository<Motocicleta>,
    @InjectRepository(Camioneta)
    private readonly camionetaRepository: Repository<Camioneta>,
  ) {}

  async create(createVehiculoDto: CreateVehiculoDto) {
    try {
      switch (createVehiculoDto.tipo) {
        case 'Auto':
          const auto = this.autoRepository.create(createVehiculoDto as unknown as Auto);
          return await this.autoRepository.save(auto);

        case 'Moto':
          const moto = this.motocicletaRepository.create(createVehiculoDto as unknown as Motocicleta);
          return await this.motocicletaRepository.save(moto);

        case 'Camioneta':
          const camion = this.camionetaRepository.create(createVehiculoDto as unknown as Camioneta);
          return await this.camionetaRepository.save(camion);

        default:
          throw new HttpException(
            'Tipo de vehículo no soportado',
            HttpStatus.BAD_REQUEST,
          );
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          'La placa ya existe en la base de datos',
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  async findAll() {
    return await this.vehiculoRepository.find();
  }

  async findOne(id: string) {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { id },
    });

    if (!vehiculo) {
      throw new HttpException(
        `Vehículo con ID ${id} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return vehiculo;
  }

  //buscar por placa
  async findByPlaca(placa: string) {
  const vehiculo = await this.vehiculoRepository.findOne({
    where: { placa },
  });

  if (!vehiculo) {
    throw new HttpException(
      `Vehículo con placa ${placa} no encontrado`,
      HttpStatus.NOT_FOUND,
    );
  }

  return vehiculo;
}

  async update(id: string, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { id },
    });

    if (!vehiculo) {
      throw new HttpException(
        `Vehículo con ID ${id} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(vehiculo, updateVehiculoDto);
    return await this.vehiculoRepository.save(vehiculo);
  }

  async remove(id: string) {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { id },
    });

    if (!vehiculo) {
      throw new HttpException(
        `Vehículo con ID ${id} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.vehiculoRepository.remove(vehiculo);
  }
}
