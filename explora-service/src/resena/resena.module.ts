import { Module } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { ResenaController } from './resena.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resena])],
  controllers: [ResenaController],
  providers: [ResenaService],
})
export class ResenaModule {}
