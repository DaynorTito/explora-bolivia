import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUbicacionDto {
    @IsString()
    @IsNotEmpty()
    nombreUbicacion: string;
  
    @IsNumber()
    @IsOptional()
    latitud?: number;
  
    @IsNumber()
    @IsOptional()
    longitud?: number;
  
    @IsString()
    @IsOptional()
    tipo?: string;
  }
  