import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { DestinoTuristicoSeeder } from './destino-turistico.seeder';

@Injectable()
export class SeedCommand {
  constructor(private readonly destinoTuristicoSeeder: DestinoTuristicoSeeder) {}

  @Command({
    command: 'seed:run',
    describe: 'Seed the database with initial data',
  })
  async run() {
    try {
      await this.destinoTuristicoSeeder.seed();
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
}
