import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  SetMetadata,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '~auth/guards/auth-guard';

import { BeerDepService } from '~beer/beer-dep.service';
import { BeerService } from '~beer/beer.service';
import { CreateBeerDto } from '~beer/create-beer.dto';
import { VineService } from '~vine/vine/vine.service';

@Controller('beer')
export class BeerController {
  constructor(
    private readonly beerService: BeerService,
    private readonly beerDepService: BeerDepService,
    private readonly vineService: VineService,
  ) {}

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
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard)
  async getRandomBeer() {
    const randomBeer = await this.beerService.getRandomBeer();
    await this.beerService.increaseBeerRandomCount(randomBeer);

    const testBool = await this.vineService.testVineService();

    if (!testBool) {
      throw new BadRequestException();
    }

    return randomBeer;
  }

  @Get('/test-naja')
  async testDepsCircular() {
    return this.beerDepService.callVineDepForTestCircularDeps();
  }
}
