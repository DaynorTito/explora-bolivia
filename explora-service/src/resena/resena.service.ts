import { Injectable } from '@nestjs/common';
import { CreateResenaDto } from './dto/create-resena.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { Repository } from 'typeorm';
import { DestinoTuristico } from 'src/destino-turistico/entities/destino-turistico.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepository: Repository<Resena>,
  ) {}

  async create(createResenaDto: CreateResenaDto, destinoId: string): Promise<Resena> {
    const destino = await this.resenaRepository.manager.findOne(DestinoTuristico, { where: { id: destinoId } });
    if (!destino) {
      throw new NotFoundError('Destino no encontrado');
    }
    const nuevaResena = this.resenaRepository.create({ ...createResenaDto, destino });
    return this.resenaRepository.save(nuevaResena);
  }

  async findAllByDestino(destinoId: string): Promise<Partial<Resena>[]> {
    return this.resenaRepository.find({
      select: ['id', 'calificacion', 'comentario', 'nombrePersona', 'createdAt', 'updatedAt'],
      where: { destino: { id: destinoId } },
      order: { createdAt: 'DESC' },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} resena`;
  }
}
