import { Connection, Repository } from 'typeorm';
import { Beer } from '../../src/beer/beer.entity';
import { BeerService } from '../../src/beer/beer.service';
import { Seedable } from './types';

export class SeedBeer implements Seedable {
  private entityRepository: Repository<Beer>;

  constructor(connection: Connection) {
    this.entityRepository = connection.getRepository(Beer);
  }

  async seed() {
    const amountDataForSeed = 10;
    await Promise.all(
      [...new Array(amountDataForSeed)].map(
        async function getFakeBeer(): Promise<Beer> {
          const fakeBeer = await BeerService.getRandomBeerFromThirdParty();
          await this.entityRepository.save(fakeBeer);

          return fakeBeer;
        }.bind(this),
      ),
    );

    console.log('Beers have been seed');
  }
}
