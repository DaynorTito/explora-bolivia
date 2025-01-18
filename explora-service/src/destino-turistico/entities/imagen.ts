import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DestinoTuristico } from "./destino-turistico.entity";

@Entity()
export class Imagen {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    url: string;

    @ManyToOne(() => DestinoTuristico, destino => destino.imagenes)
    destino: DestinoTuristico;
}
