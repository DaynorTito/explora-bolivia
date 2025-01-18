import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImages(files: Array<Express.Multer.File>): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se ha subido ningún archivo');
    }

    try {
      const uploadedImages = await Promise.all(
        files.map((file) => this.uploadImage(file)),
      );
      return uploadedImages;
    } catch (error) {
      throw new BadRequestException('Error al subir las imágenes', error);
    }
  }

  private async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'destinos-turisticos' },
        (err, result) => {
          if (err || !result) {
            return reject(new BadRequestException('Error al subir la imagen'));
          }
          resolve(result.secure_url);
        },
      );
      upload.end(file.buffer);
    });
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const publicId = this.extractPublicId(imageUrl);
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result !== 'ok') {
        throw new Error('Error al eliminar la imagen');
      }
    } catch (err) {
      throw new NotFoundException(
        'La imagen no existe o ya ha sido eliminada',
        err,
      );
    }
  }

  private extractPublicId(url: string): string {
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = `destinos-turisticos/${filename.split('.')[0]}`;
    return publicId;
  }
}
