import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinoTuristicoSeeder } from './destino-turistico.seeder';
import { SeedCommand } from './seed.command';
import { DestinoTuristico } from '../../destino-turistico/entities/destino-turistico.entity';
import { Ubicacion } from '../../destino-turistico/entities/ubicacion';
import { Imagen } from '../../destino-turistico/entities/imagen';
import { Resena } from '../../resena/entities/resena.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DestinoTuristico,
      Ubicacion,
      Imagen,
      Resena,
    ]),
  ],
  providers: [DestinoTuristicoSeeder, SeedCommand],
  exports: [DestinoTuristicoSeeder],
})
export class SeedersModule {}
