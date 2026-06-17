import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

// Metodo para calcular el año actual y establecerlo como límite máximo para el año del vehículo
const currentYear = new Date().getFullYear();

export class CreateVehiculoDto {
  @ApiProperty({
    enum: ['Auto', 'Moto', 'Camioneta'],
    example: 'Auto',
    description: 'Tipo de vehículo a crear',
  })
  @IsIn(['Auto', 'Moto', 'Camioneta'], { message: 'El tipo debe ser: Auto, Moto o Camioneta' })
  tipo!: string;

  @ApiProperty({
    example: 'ABC-1234',
    description: 'Placa del vehículo en formato ABC-1234',
    pattern: '^[A-Z]{3}-\\d{4}$',
  })
  @IsString()
  @Matches(/^[A-Z]{3}-\d{4}$/, 
      { message: 'La placa debe tener el formato ABC-1234' }
  )
  placa!: string;

  @ApiProperty({
    example: 'Toyota',
    description: 'Marca del vehículo',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty({ message: 'La marca no puede estar vacía' })
  @MinLength(3, { message: 'La marca debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'La marca no puede tener más de 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, { message: 'La marca solo puede contener letras y espacios' })
  marca!: string;

  @ApiProperty({
    example: 'Corolla',
    description: 'Modelo del vehículo',
    minLength: 1,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty({ message: 'El modelo no puede estar vacío' })
  @MinLength(1, { message: 'El modelo debe tener al menos 1 carácter' })
  @MaxLength(20, { message: 'El modelo no puede tener más de 20 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s0-9]+$/, { message: 'El modelo solo puede contener letras, números y espacios' })
  modelo!: string;

  @ApiProperty({
    example: 'Azul',
    description: 'Color del vehículo',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty({ message: 'El color no puede estar vacío' })
  @MinLength(4, { message: 'El color debe tener al menos 4 caracteres' })
  @MaxLength(20, { message: 'El color no puede tener más de 20 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, { message: 'El color solo puede contener letras y espacios' })
  color!: string;

  @ApiProperty({
    example: 2023,
    description: 'Año del vehículo',
    minimum: 1900,
    maximum: currentYear,
  })
  @IsNumber({}, { message: 'El año debe ser un número' })
  @Min(1900, { message: 'El año debe ser mayor o igual a 1900' })
  @Max(currentYear, { message: 'El año no puede ser mayor al año actual' })
  anio!: number;

  @ApiProperty({
    enum: ['Eléctrico', 'Híbrido', 'Gasolina', 'Diésel'],
    example: 'Gasolina',
    description: 'Clasificación de combustible del vehículo',
  })
  @IsString()
  @IsNotEmpty({ message: 'La clasificación no puede estar vacía' })
  @IsIn(['Eléctrico', 'Híbrido', 'Gasolina', 'Diésel'], { message: 'La clasificación debe ser: Eléctrico, Híbrido, Gasolina o Diésel' })
  clasificacion!: string;

  @ApiProperty({
    example: 4,
    description: 'Número de puertas (solo para Auto)',
    minimum: 2,
    maximum: 5,
    required: false,
  })
  @ValidateIf((o) => o.numeroPuertas !== undefined)
  @IsNumber({}, { message: 'El número de puertas debe ser un número' })
  @IsPositive({ message: 'El número de puertas debe ser un número positivo' })
  @Min(2, { message: 'El número de puertas debe ser al menos 2' })
  @Max(5, { message: 'El número de puertas no puede ser mayor a 5' })
  numeroPuertas?: number;

  @ApiProperty({
    example: 450,
    description: 'Capacidad del maletero en litros (solo para Auto)',
    maximum: 1000,
    required: false,
  })
  @ValidateIf((o) => o.capacidadMaletero !== undefined)
  @IsNumber({}, { message: 'La capacidad del maletero debe ser un número' })
  @IsPositive({ message: 'La capacidad del maletero debe ser un número positivo' })
  @Max(1000, { message: 'La capacidad del maletero no puede ser mayor a 1000 litros' })
  capacidadMaletero?: number;

  @ApiProperty({
    enum: ['Deportiva', 'Crucero', 'Naked', 'Scooter', 'Enduro'],
    example: 'Deportiva',
    description: 'Tipo de motocicleta (solo para Moto)',
    required: false,
  })
  @ValidateIf((o) => o.tipoMotocicleta !== undefined)
  @IsString({ message: 'tipoMotocicleta must be a string' })
  @Matches(/^(Deportiva|Crucero|Naked|Scooter|Enduro)$/, 
      { message: 'El tipo de motocicleta debe ser uno de los siguientes: Deportiva, Crucero, Naked, Scooter, Enduro' }
  )
  tipoMotocicleta?: string;

  @ApiProperty({
    enum: ['Simple', 'Doble'],
    example: 'Doble',
    description: 'Tipo de cabina (solo para Camioneta)',
    required: false,
  })
  @ValidateIf((o) => o.cabina !== undefined)
  @IsString({ message: 'cabina must be a string' })
  @Matches(/^(Simple|Doble)$/, 
      { message: 'La cabina debe ser Simple o Doble' }
  )
  cabina?: string;

  @ApiProperty({
    example: 5000,
    description: 'Capacidad de carga en kg (solo para Camioneta)',
    maximum: 10000,
    required: false,
  })
  @ValidateIf((o) => o.capacidadCarga !== undefined)
  @IsNumber({}, { message: 'La capacidad de carga debe ser un número' })
  @IsPositive({ message: 'La capacidad de carga debe ser un número positivo' })
  @Max(10000, { message: 'La capacidad de carga no puede ser mayor a 10000 kg' })
  capacidadCarga?: number;
}