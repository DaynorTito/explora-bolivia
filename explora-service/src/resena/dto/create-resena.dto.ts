import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateResenaDto {
  @Column()
  @IsNotEmpty()
  @IsNumber()
  calificacion: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  comentario: string;

  @Column()
  @IsOptional()
  @IsString()
  nombrePersona?: string;
}
