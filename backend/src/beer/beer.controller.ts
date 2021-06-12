import { Controller, Get } from '@nestjs/common';
import { BeerService } from './beer.service';

@Controller('beer')
export class BeerController {
  constructor(private readonly beerService: BeerService) {}

  @Get('/random')
  getBeer() {
    return 'This is random beer';
  }
}
