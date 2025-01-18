import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { DestinoTuristico } from './destino-turistico.entity';

@Entity()
export class Ubicacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @IsString()
  nombreUbicacion: string;

  @Column({ type: 'float', nullable: true })
  @IsNumber()
  @IsOptional()
  latitud: number;

  @Column({ type: 'float', nullable: true })
  @IsNumber()
  @IsOptional()
  longitud: number;

  @Column()
  @IsString()
  @IsOptional()
  tipo: string;

  @OneToMany(() => DestinoTuristico, (destino) => destino.ubicacion)
  destinos: DestinoTuristico[];
}
