import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { CreateResenaDto } from './dto/create-resena.dto';

@Controller('resena')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

  @Post(':destinoId')
  async create(
    @Param('destinoId') destinoId: string,
    @Body() createResenaDto: CreateResenaDto,
  ) {
    return this.resenaService.create(createResenaDto, destinoId);
  }

  @Get(':destinoId')
  async findAllByDestino(@Param('destinoId') destinoId: string) {
    return this.resenaService.findAllByDestino(destinoId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resenaService.remove(+id);
  }
}
