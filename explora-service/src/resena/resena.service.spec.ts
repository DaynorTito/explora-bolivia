import { Test, TestingModule } from '@nestjs/testing';
import { ResenaService } from './resena.service';
import { Repository } from 'typeorm';
import { Resena } from './entities/resena.entity';
import { NotFoundError } from 'rxjs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateResenaDto } from './dto/create-resena.dto';

describe('ResenaService', () => {
  let service: ResenaService;
  let resenaRepository: Repository<Resena>;

  const mockDestinoTuristico = { id: '1', nombre: 'Destino 1' };
  const mockResena = { id: 1, calificacion: 5, comentario: 'Excelente', destino: mockDestinoTuristico };
  const createResenaDto: CreateResenaDto = { calificacion: 5, comentario: 'Excelente', nombrePersona: 'Juan' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResenaService,
        {
          provide: getRepositoryToken(Resena),
          useValue: {
            create: jest.fn().mockReturnValue(mockResena),
            save: jest.fn().mockResolvedValue(mockResena),
            manager: {
              findOne: jest.fn().mockResolvedValue(mockDestinoTuristico),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ResenaService>(ResenaService);
    resenaRepository = module.get<Repository<Resena>>(getRepositoryToken(Resena));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new resena if destino exists', async () => {
      const result = await service.create(createResenaDto, '1');
      expect(result).toEqual(mockResena);
      expect(resenaRepository.create).toHaveBeenCalledWith({ ...createResenaDto, destino: mockDestinoTuristico });
      expect(resenaRepository.save).toHaveBeenCalledWith(mockResena);
    });

    it('should throw a NotFoundError if destino does not exist', async () => {
      resenaRepository.manager.findOne = jest.fn().mockResolvedValue(null); // Simulando que no se encuentra el destino

      await expect(service.create(createResenaDto, 'non-existing-id')).rejects.toThrow(NotFoundError);
    });
  });
});
