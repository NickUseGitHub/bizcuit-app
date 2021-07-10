import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Beer } from '@beer/beer.entity';
import { CreateBeerDto } from '@beer/create-beer.dto';

@Injectable()
export class BeerService {
  constructor(
    @InjectRepository(Beer, 'beer')
    private readonly beersRepository: Repository<Beer>,
  ) {}

  static async getRandomBeerFromThirdParty() {
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
}
