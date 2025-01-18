import { IsNotEmpty, IsOptional } from 'class-validator';
import { DestinoTuristico } from 'src/destino-turistico/entities/destino-turistico.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resena {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  calificacion: number;

  @Column()
  @IsNotEmpty()
  comentario: string;

  @Column({ default: 'Anónimo' })
  @IsOptional()
  nombrePersona: string;  

  @ManyToOne(() => DestinoTuristico, (destination) => destination.resenas, {
    onDelete: 'CASCADE',
  })
  destino: DestinoTuristico;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
