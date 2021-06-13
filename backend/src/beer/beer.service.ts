import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Beer } from './beer.entity';
import axios from 'axios';
import { CreateBeerDto } from './create-beer.dto';

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
    const fakeBeers = (await Promise.all(
      [...new Array(amountDataForSeed)].map(
        async function getFakeBeer(): Promise<Beer> {
          const fakeBeer = await this.getRandomBeerFromThirdParty();
          this.beersRepository.save(fakeBeer);

          return fakeBeer;
        }.bind(this),
      ),
    )) as Beer[];

    return fakeBeers;
  }

  async create(createBeerDto: CreateBeerDto): Promise<Beer> {
    const now = new Date();
    const beer = new Beer();
    beer.uid = createBeerDto.uid;
    beer.brand = createBeerDto.brand;
    beer.name = createBeerDto.name;
    beer.style = createBeerDto.style;
    beer.hop = createBeerDto.hop;
    beer.yeast = createBeerDto.yeast;
    beer.malts = createBeerDto.malts;
    beer.ibu = createBeerDto.ibu;
    beer.alcohol = createBeerDto.alcohol;
    beer.blg = createBeerDto.blg;
    beer.createdAt = now;
    beer.updatedAt = now;

    return this.beersRepository.save(beer);
  }

  async getRandomBeer() {
    return this.beersRepository
      .createQueryBuilder()
      .select()
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
  }

  async increaseBeerRandomCount(beer: Beer): Promise<void> {
    if (!beer) {
      return;
    }

    beer.randomCount = beer.randomCount + 1;
    await this.beersRepository.save(beer);
  }

  onModuleInit() {
    this.seedData();
  }
}
