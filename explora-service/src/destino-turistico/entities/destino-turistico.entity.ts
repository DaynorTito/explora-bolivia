import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Ubicacion } from './ubicacion';
import { Imagen } from './imagen';
import { Resena } from 'src/resena/entities/resena.entity';

@Entity()
export class DestinoTuristico {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @Column()
  @IsString()
  @IsOptional()
  descripcion: string;

  @Column()
  @IsString()
  @IsOptional()
  departamento: string;

  @Column()
  @IsString()
  @IsOptional()
  puntoSalida: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @IsNumber()
  @IsOptional()
  costoAprox: number;

  @Column()
  @IsNumber()
  @IsOptional()
  calificacion: number;

  @ManyToOne(() => Ubicacion, (ubicacion) => ubicacion.destinos)
  ubicacion: Ubicacion;

  @OneToMany(() => Imagen, (imagen) => imagen.destino, {
    cascade: true,
    eager: true,
  })
  imagenes: Imagen[];

  @OneToMany(() => Resena, (resena) => resena.destino, {
    cascade: true,
    eager: true,
  })
  resenas: Resena[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
