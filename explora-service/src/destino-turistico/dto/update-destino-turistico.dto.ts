import { PartialType } from '@nestjs/mapped-types';
import { CreateDestinoTuristicoDto } from './create-destino-turistico.dto';

export class UpdateDestinoTuristicoDto extends PartialType(CreateDestinoTuristicoDto) {}
