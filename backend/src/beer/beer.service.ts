import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Beer } from './beer.entity';

@Injectable()
export class BeerService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Beer)
    private readonly ticketsRepository: Repository<Beer>,
  ) {}

  private async seedData(): Promise<void> {
    const isSeedData = this.configService.get<string>('SEED_DATA') || '';
    const nodeEnv = this.configService.get<string>('NODE_ENV');

    const shouldSeedData =
      isSeedData.toUpperCase() === 'YES' && nodeEnv !== 'production';

    if (shouldSeedData !== true) {
      return;
    }

    console.log('isSeedData', isSeedData);
    console.log('nodeEnv', nodeEnv);
  }

  onModuleInit() {
    this.seedData();
  }
}
