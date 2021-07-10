import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { VineDepService } from '../vine/vine-dep.service';

@Injectable()
export class BeerDepService {
  constructor(
    @Inject(forwardRef(() => VineDepService))
    private readonly vineDepService: VineDepService,
  ) {}

  async testCircularDep(): Promise<string> {
    return 'this is from BeepDepService';
  }

  async callVineDepForTestCircularDeps(): Promise<string> {
    const strFromSelf = await this.testCircularDep();
    const strFromDep = await this.vineDepService.testCircularDep();

    return `${strFromSelf} ${strFromDep}`;
  }
}
