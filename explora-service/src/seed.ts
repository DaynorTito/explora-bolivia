import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { DatabaseModule } from './database/database.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(DatabaseModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    console.error('Error executing seed command:', error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
