import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { Beer } from './beer.entity';
import { BeerService } from './beer.service';

@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Post()
  async create(
    @Body() beer: Omit<Beer, 'randomCount' | 'createdAt' | 'updatedAt'>,
  ) {
    try {
      const beerFromDb = await this.beerService.create(beer);

      return beerFromDb;
    } catch (err) {
      throw new BadRequestException(
        {
          message: err.message,
        },
        err,
      );
    }
  }

  @Get('/random')
  async getRandomBeer() {
    const randomBeer = await this.beerService.getRandomBeer();
    await this.beerService.increaseBeerRandomCount(randomBeer);

    return randomBeer;
  }
}
