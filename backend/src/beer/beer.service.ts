import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Beer } from './beer.entity';
import axios from 'axios';

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

  async create(
    beerFromApi: Omit<Beer, 'randomCount' | 'createdAt' | 'updatedAt'>,
  ): Promise<Beer> {
    const now = new Date();
    const beer = new Beer();
    beer.uid = beerFromApi.uid;
    beer.brand = beerFromApi.brand;
    beer.name = beerFromApi.name;
    beer.style = beerFromApi.style;
    beer.hop = beerFromApi.hop;
    beer.yeast = beerFromApi.yeast;
    beer.malts = beerFromApi.malts;
    beer.ibu = beerFromApi.ibu;
    beer.alcohol = beerFromApi.alcohol;
    beer.blg = beerFromApi.blg;
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

  async getRandomBeerFromThirdParty() {
    const beerFromApi = await axios
      .get<Beer>('https://random-data-api.com/api/beer/random_beer')
      .then((res) => res.data);

    const now = new Date();
    const beer = new Beer();
    beer.uid = beerFromApi.uid;
    beer.brand = beerFromApi.brand;
    beer.name = beerFromApi.name;
    beer.style = beerFromApi.style;
    beer.hop = beerFromApi.hop;
    beer.yeast = beerFromApi.yeast;
    beer.malts = beerFromApi.malts;
    beer.ibu = beerFromApi.ibu;
    beer.alcohol = beerFromApi.alcohol;
    beer.blg = beerFromApi.blg;
    beer.createdAt = now;
    beer.updatedAt = now;

    return beer;
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
