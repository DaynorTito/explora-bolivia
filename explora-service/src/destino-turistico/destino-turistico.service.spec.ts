import { Test, TestingModule } from '@nestjs/testing';
import { DestinoTuristicoService } from './destino-turistico.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DestinoTuristico } from './entities/destino-turistico.entity';
import { Ubicacion } from './entities/ubicacion';
import { Imagen } from './entities/imagen';
import { Resena } from 'src/resena/entities/resena.entity';
import { NotFoundException } from '@nestjs/common';

describe('DestinoTuristicoService', () => {
  let service: DestinoTuristicoService;
  let destinoTuristicoRepository: Repository<DestinoTuristico>;
  let ubicacionRepository: Repository<Ubicacion>;
  let imagenRepository: Repository<Imagen>;
  let resenaRepository: Repository<Resena>;

  const mockDestinoTuristico = {
    id: '1',
    nombre: 'Destino Test',
    descripcion: 'Descripcion Test',
    departamento: 'Departamento Test',
    puntoSalida: 'Punto Test',
    costoAprox: 100,
    calificacion: 4,
    ubicacion: {},
    imagenes: [],
    resenas: [],
  };

  const mockUbicacion = {
    nombreUbicacion: 'Ubicacion Test',
    latitud: 0,
    longitud: 0,
    tipo: 'Tipo Test',
  };

  const mockImagen = {
    url: 'http://imagen.com/test.jpg',
  };

  const mockResena = {
    comentario: 'Comentario Test',
    calificacion: 5,
    nombrePersona: 'Persona Test',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinoTuristicoService,
        {
          provide: getRepositoryToken(DestinoTuristico),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Ubicacion),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Imagen),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Resena),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DestinoTuristicoService>(DestinoTuristicoService);
    destinoTuristicoRepository = module.get<Repository<DestinoTuristico>>(getRepositoryToken(DestinoTuristico));
    ubicacionRepository = module.get<Repository<Ubicacion>>(getRepositoryToken(Ubicacion));
    imagenRepository = module.get<Repository<Imagen>>(getRepositoryToken(Imagen));
    resenaRepository = module.get<Repository<Resena>>(getRepositoryToken(Resena));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new DestinoTuristico', async () => {
      const createDestinoDto = {
        nombre: 'Nuevo Destino',
        descripcion: 'Descripcion del nuevo destino',
        departamento: 'Departamento',
        puntoSalida: 'Punto de salida',
        costoAprox: 150,
        calificacion: 5,
        ubicacion: mockUbicacion,
        imagenesUrls: [mockImagen.url],
        resenas: [mockResena],
      };

      jest.spyOn(ubicacionRepository, 'create').mockReturnValue(mockUbicacion as any);
      jest.spyOn(ubicacionRepository, 'save').mockResolvedValue(mockUbicacion as any);
      jest.spyOn(resenaRepository, 'create').mockReturnValue([mockResena] as any);
      jest.spyOn(resenaRepository, 'save').mockResolvedValue([mockResena] as any);
      jest.spyOn(imagenRepository, 'create').mockReturnValue(mockImagen as any);
      jest.spyOn(imagenRepository, 'save').mockResolvedValue([mockImagen] as any);
      jest.spyOn(destinoTuristicoRepository, 'create').mockReturnValue(mockDestinoTuristico as any);
      jest.spyOn(destinoTuristicoRepository, 'save').mockResolvedValue(mockDestinoTuristico as any);

      const result = await service.create(createDestinoDto);
      expect(result).toEqual(mockDestinoTuristico);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if destino is not found', async () => {
      jest.spyOn(destinoTuristicoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrowError(NotFoundException);
    });

    it('should return a destino if found', async () => {
      jest.spyOn(destinoTuristicoRepository, 'findOne').mockResolvedValue(mockDestinoTuristico as any);

      const result = await service.findOne('1');
      expect(result).toEqual(mockDestinoTuristico);
    });
  });

  describe('update', () => {
    it('should update a destino', async () => {
      const updateDestinoDto = {
        nombre: 'Destino Actualizado',
        descripcion: 'Descripcion Actualizada',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockDestinoTuristico as any);
      jest.spyOn(destinoTuristicoRepository, 'save').mockResolvedValue(mockDestinoTuristico as any);

      const result = await service.update('1', updateDestinoDto);
      expect(result.nombre).toEqual('Destino Actualizado');
    });
  });

  describe('remove', () => {
    it('should remove a destino', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockDestinoTuristico as any);
      jest.spyOn(imagenRepository, 'delete').mockResolvedValue(undefined);
      jest.spyOn(destinoTuristicoRepository, 'remove').mockResolvedValue(undefined);

      const result = await service.remove('1');
      expect(result).toEqual({ message: 'Destino turístico eliminado exitosamente' });
    });
  });

  describe('findByDepartamento', () => {
    it('should return destinos by departamento', async () => {
      jest.spyOn(destinoTuristicoRepository, 'find').mockResolvedValue([mockDestinoTuristico] as any);

      const result = await service.findByDepartamento('Departamento Test');
      expect(result).toEqual([mockDestinoTuristico]);
    });
  });
});
