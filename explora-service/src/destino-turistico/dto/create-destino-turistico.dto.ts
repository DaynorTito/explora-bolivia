import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUbicacionDto } from './create-ubicacion-destino.dto';
import { Type } from 'class-transformer';
import { CreateResenaDto } from 'src/resena/dto/create-resena.dto';

export class CreateDestinoTuristicoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  departamento?: string;

  @IsString()
  @IsOptional()
  puntoSalida?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  imagenesUrls?: string[];

  @IsNumber()
  @IsOptional()
  calificacion?: number;

  @IsNumber()
  @IsOptional()
  costoAprox?: number;

  @ValidateNested()
  @Type(() => CreateUbicacionDto)
  @IsNotEmpty()
  ubicacion: CreateUbicacionDto;

  @ValidateNested()
  @Type(() => CreateResenaDto)
  @IsOptional()
  resenas?: CreateResenaDto[];
}
