import { Controller, Post, UseInterceptors, UploadedFiles, ParseFilePipeBuilder } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/services/cloudinary.service';

@Controller('imagen')
export class ImagenController {
  constructor(private readonly imageneService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('imagenes'))
  async uploadFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.imageneService.uploadImages(files);
  }
}
