import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinoTuristicoDto } from './dto/create-destino-turistico.dto';
import { UpdateDestinoTuristicoDto } from './dto/update-destino-turistico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinoTuristico } from './entities/destino-turistico.entity';
import { Repository } from 'typeorm';
import { Ubicacion } from './entities/ubicacion';
import { Imagen } from './entities/imagen';
import { Resena } from 'src/resena/entities/resena.entity';

@Injectable()
export class DestinoTuristicoService {
  constructor(
    @InjectRepository(DestinoTuristico)
    private readonly destinoTuristicoRepository: Repository<DestinoTuristico>,
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
    @InjectRepository(Resena)
    private readonly resenaRepository: Repository<Resena>,
  ) {}

  async create(
    createDestinoDto: CreateDestinoTuristicoDto,
  ): Promise<DestinoTuristico> {
    const ubicacion = await this.createDestinoUbicacion(createDestinoDto);
    const resenas: Resena[] = await this.createResenasDestino(createDestinoDto);
    const destino = this.destinoTuristicoRepository.create({
      nombre: createDestinoDto.nombre,
      descripcion: createDestinoDto.descripcion,
      departamento: createDestinoDto.departamento,
      puntoSalida: createDestinoDto.puntoSalida,
      costoAprox: createDestinoDto.costoAprox,
      calificacion: createDestinoDto.calificacion,
      ubicacion,
      resenas
    });

    await this.createImagenesDestino(createDestinoDto, destino);
    return this.destinoTuristicoRepository.save(destino);
  }

  async createResenasDestino(createDestinoDto: CreateDestinoTuristicoDto): Promise<Resena[]> {
    const resenas = createDestinoDto.resenas.map((resena) => {
      return this.resenaRepository.create(resena);
    });
    return this.resenaRepository.save(resenas);
  }

  async createDestinoUbicacion(
    createDestinoDto: CreateDestinoTuristicoDto,
  ): Promise<Ubicacion> {
    const ubicacion = this.ubicacionRepository.create({
      nombreUbicacion: createDestinoDto.ubicacion.nombreUbicacion,
      latitud: createDestinoDto.ubicacion.latitud,
      longitud: createDestinoDto.ubicacion.longitud,
      tipo: createDestinoDto.ubicacion.tipo,
    });

    return await this.ubicacionRepository.save(ubicacion);
  }

  async createImagenesDestino(
    createDestinoDto: CreateDestinoTuristicoDto,
    destino: DestinoTuristico,
  ): Promise<void> {
    if (createDestinoDto.imagenesUrls?.length) {
      destino.imagenes = createDestinoDto.imagenesUrls.map((url) =>
        this.imagenRepository.create({ url }),
      );
    }
  }

  async findAll(query: any): Promise<DestinoTuristico[]> {
    const queryBuilder = this.destinoTuristicoRepository
      .createQueryBuilder('destino')
      .leftJoinAndSelect('destino.ubicacion', 'ubicacion')
      .leftJoinAndSelect('destino.imagenes', 'imagenes');

    if (query.keyword) {
      queryBuilder.andWhere(
        '(destino.nombre ILIKE :keyword OR destino.descripcion ILIKE :keyword)',
        { keyword: `%${query.keyword}%` },
      );
    }

    if (query.departamento) {
      queryBuilder.andWhere('destino.departamento ILIKE :departamento', {
        departamento: `%${query.departamento}%`,
      });
    }

    if (query.costoMin) {
      queryBuilder.andWhere('destino.costoAprox >= :costoMin', {
        costoMin: query.costoMin,
      });
    }

    if (query.costoMax) {
      queryBuilder.andWhere('destino.costoAprox <= :costoMax', {
        costoMax: query.costoMax,
      });
    }

    if (query.calificacion) {
      queryBuilder.andWhere('destino.calificacion = :calificacion', {
        calificacion: query.calificacion,
      });
    }

    if (query.orderBy) {
      const validFields = ['nombre', 'costoAprox'];
      const orderBy = validFields.includes(query.orderBy)
        ? query.orderBy
        : 'nombre'; // Campo por defecto: nombre
      const orderDirection = query.orderDirection === 'DESC' ? 'DESC' : 'ASC'; // Dirección por defecto: ASC
      queryBuilder.orderBy(`destino.${orderBy}`, orderDirection);
    } else {
      queryBuilder.orderBy('destino.nombre', 'ASC');
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string) {
    const destino = await this.destinoTuristicoRepository.findOne({
      where: { id },
      relations: ['ubicacion', 'imagenes'],
    });

    if (!destino)
      throw new NotFoundException(
        `Destino turístico con ID ${id} no encontrado`,
      );

    return destino;
  }

  async update(
    id: string,
    updateDestinoDto: UpdateDestinoTuristicoDto,
  ): Promise<DestinoTuristico> {
    const destino = await this.findOne(id);
    if (updateDestinoDto.ubicacion)
      await this.ubicacionRepository.update(
        destino.ubicacion.id,
        updateDestinoDto.ubicacion,
      );
    if (updateDestinoDto.imagenesUrls) {
      await this.imagenRepository.delete({ destino: { id } });
      destino.imagenes = updateDestinoDto.imagenesUrls.map((url) =>
        this.imagenRepository.create({ url }),
      );
    }

    Object.assign(destino, updateDestinoDto);
    delete destino.ubicacion;

    return this.destinoTuristicoRepository.save(destino);
  }

  async remove(id: string) {
    const destino = await this.findOne(id);
    await this.imagenRepository.delete({ destino: { id } });
    await this.destinoTuristicoRepository.remove(destino);
    return { message: 'Destino turístico eliminado exitosamente' };
  }

  async findByDepartamento(departamento: string) {
    return this.destinoTuristicoRepository.find({
      where: { departamento },
      relations: ['ubicacion', 'imagenes'],
    });
  }

  async findByCostoRange(minCosto: number, maxCosto: number) {
    return this.destinoTuristicoRepository
      .createQueryBuilder('destino')
      .leftJoinAndSelect('destino.ubicacion', 'ubicacion')
      .leftJoinAndSelect('destino.imagenes', 'imagenes')
      .where('destino.costoAprox BETWEEN :minCosto AND :maxCosto', {
        minCosto,
        maxCosto,
      })
      .getMany();
  }

  async findTopRated(limit: number = 10) {
    return this.destinoTuristicoRepository
      .createQueryBuilder('destino')
      .leftJoinAndSelect('destino.ubicacion', 'ubicacion')
      .leftJoinAndSelect('destino.imagenes', 'imagenes')
      .orderBy('destino.calificacion', 'DESC')
      .take(limit)
      .getMany();
  }
}
