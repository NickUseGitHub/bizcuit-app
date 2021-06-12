import { Controller, Get } from '@nestjs/common';
import { BeerService } from './beer.service';

@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Get('/random')
  async getRandomBeer() {
    const randomBeer = await this.beerService.getRandomBeer();
    await this.beerService.increaseBeerRandomCount(randomBeer);

    return randomBeer;
  }
}
