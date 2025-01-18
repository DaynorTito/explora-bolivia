import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from '../config/cloudinary.config';
import { CloudinaryService } from '../services/cloudinary.service';
import { ImagenController } from 'src/controllers/imagenes.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ImagenController],  // Añade el controlador aquí
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}


