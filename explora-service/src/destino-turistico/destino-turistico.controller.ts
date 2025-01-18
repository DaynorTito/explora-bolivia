import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { DestinoTuristicoService } from './destino-turistico.service';
import { CreateDestinoTuristicoDto } from './dto/create-destino-turistico.dto';
import { UpdateDestinoTuristicoDto } from './dto/update-destino-turistico.dto';

@Controller('destino-turistico')
export class DestinoTuristicoController {
  constructor(private readonly destinoTuristicoService: DestinoTuristicoService) {}

  @Post()
  create(@Body() createDestinoTuristicoDto: CreateDestinoTuristicoDto) {
    return this.destinoTuristicoService.create(createDestinoTuristicoDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.destinoTuristicoService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinoTuristicoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDestinoTuristicoDto: UpdateDestinoTuristicoDto) {
    return this.destinoTuristicoService.update(id, updateDestinoTuristicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.destinoTuristicoService.remove(id);
  }
}
