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

import { Beer } from '~beer/beer.entity';
import { BeerDepService } from '~beer/beer-dep.service';
import { BeerService } from '~beer/beer.service';
import { CreateBeerDto } from '~beer/create-beer.dto';
import { AuthBeerGuard } from '~beer/guards/auth-beer-guard';
import { VineService } from '~vine/vine/vine.service';
import { AuthBeerParams } from './decorators/auth-beer-params.decorator';

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
  @UseGuards(AuthBeerGuard)
  async getRandomBeer(@AuthBeerParams() authBeerParams: Beer) {
    const randomBeer = await this.beerService.getRandomBeer();
    await this.beerService.increaseBeerRandomCount(randomBeer);

    const testBool = await this.vineService.testVineService();

    if (!testBool) {
      throw new BadRequestException();
    }

    console.log('authBeerParams', authBeerParams);

    return randomBeer;
  }

  @Get('/test-naja')
  async testDepsCircular() {
    return this.beerDepService.callVineDepForTestCircularDeps();
  }
}
