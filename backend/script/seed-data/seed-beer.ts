import axios from 'axios';
import { Beer } from '../../src/beer/beer.entity';
import { Connection, Repository } from 'typeorm';
import { Seedable } from './types';

export class SeedBeer implements Seedable {
  private connection: Connection;
  private entityRepository: Repository<Beer>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.entityRepository = connection.getRepository(Beer);
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

  async seed() {
    const amountDataForSeed = 10;
    await Promise.all(
      [...new Array(amountDataForSeed)].map(
        async function getFakeBeer(): Promise<Beer> {
          const fakeBeer = await this.getRandomBeerFromThirdParty();
          this.entityRepository.save(fakeBeer);

          return fakeBeer;
        }.bind(this),
      ),
    );

    console.log('Beers have been seed');
  }
}
