import {
  company as fakerCompany,
  date as fakerDate,
  name as fakerName,
  datatype as fakerDatatype,
} from 'faker';
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
    private readonly beersRepository: Repository<Beer>,
  ) {}

  private async seedData(): Promise<Beer[]> {
    const isSeedData = this.configService.get<string>('SEED_DATA') || '';
    const nodeEnv = this.configService.get<string>('NODE_ENV');

    const shouldSeedData =
      isSeedData.toUpperCase() === 'YES' && nodeEnv !== 'production';

    if (shouldSeedData !== true) {
      return [];
    }

    const amountDataForSeed = 10;
    const fakedBeers: Beer[] = [...new Array(amountDataForSeed)].map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function getSeedBeerData(_, index: number): Beer {
        const beer = new Beer();

        beer.uid = fakerDatatype.uuid();
        beer.brand = fakerCompany.companyName();
        beer.name = fakerName.firstName();
        beer.style = 'style';
        beer.hop = 'hop';
        beer.yeast = 'yeast';
        beer.malts = 'malts';
        beer.ibu = 'ibu';
        beer.alcohol = 'alcohol';
        beer.blg = 'blg';
        beer.createdAt = fakerDate.past();
        beer.updatedAt = fakerDate.past();

        return beer;
      },
    );

    await Promise.all(
      fakedBeers.map((fakeBeer) => this.beersRepository.save(fakeBeer)),
    );

    return fakedBeers;
  }

  onModuleInit() {
    this.seedData();
  }
}
