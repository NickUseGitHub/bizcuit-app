import { Connection, Repository } from 'typeorm';
import { Vine } from '../../src/vine/vine/vine.entity';
import { BeerService } from '../../src/beer/beer.service';
import { Seedable } from './types';

export class SeedVine implements Seedable {
  private entityRepository: Repository<Vine>;

  constructor(connection: Connection) {
    this.entityRepository = connection.getRepository(Vine);
  }

  async seed() {
    const amountDataForSeed = 10;
    await Promise.all(
      [...new Array(amountDataForSeed)].map(
        async function getFakeBeer(): Promise<Vine> {
          const fakeBeer = await BeerService.getRandomBeerFromThirdParty();
          await this.entityRepository.save(fakeBeer);

          return fakeBeer;
        }.bind(this),
      ),
    );

    console.log('Vine have been seed');
  }
}
