import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BeerDepService } from '~beer/beer-dep.service';

@Injectable()
export class VineDepService {
  constructor(
    @Inject(forwardRef(() => BeerDepService))
    private readonly beerDepService: BeerDepService,
  ) {}

  async testCircularDep(): Promise<string> {
    return 'this is from VineDepService';
  }

  async callVineDepForTestCircularDeps(): Promise<string> {
    const strFromSelf = await this.testCircularDep();
    const strFromDep = await this.beerDepService.testCircularDep();

    return `${strFromSelf} ${strFromDep}`;
  }
}
