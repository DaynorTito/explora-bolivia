import { Module } from '@nestjs/common';
import { DestinoTuristicoService } from './destino-turistico.service';
import { DestinoTuristicoController } from './destino-turistico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinoTuristico } from './entities/destino-turistico.entity';
import { Imagen } from './entities/imagen';
import { Ubicacion } from './entities/ubicacion';
import { Resena } from 'src/resena/entities/resena.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DestinoTuristico, Imagen, Ubicacion, Resena]),
  ],
  controllers: [DestinoTuristicoController],
  providers: [DestinoTuristicoService],
})
export class DestinoTuristicoModule {}
