import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BeerService } from './beer.service';
import { CreateBeerDto } from './create-beer.dto';

@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() beer: CreateBeerDto) {
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
