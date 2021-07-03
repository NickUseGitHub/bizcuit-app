import { Controller, Get } from '@nestjs/common';
import { VineService } from './vine.service';

@Controller('vine')
export class VineController {
  constructor(private readonly vineService: VineService) {}

  @Get()
  async vineIndex() {
    return 'Hello this is vine';
  }

  @Get('/random')
  async getRandomBeer() {
    const randomBeer = await this.vineService.getRandomVine();
    await this.vineService.increaseVineRandomCount(randomBeer);

    return randomBeer;
  }
}
