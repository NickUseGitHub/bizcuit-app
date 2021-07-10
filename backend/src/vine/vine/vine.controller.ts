import { Controller, Get } from '@nestjs/common';
import { VineDepService } from '../vine-dep.service';
import { VineService } from './vine.service';

@Controller('vine')
export class VineController {
  constructor(
    private readonly vineService: VineService,
    private readonly vineDepService: VineDepService,
  ) {}

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

  @Get('/test-naja')
  async testDepsCircular() {
    return this.vineDepService.callVineDepForTestCircularDeps();
  }
}
