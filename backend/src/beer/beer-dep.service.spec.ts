import { Test, TestingModule } from '@nestjs/testing';
import { BeerDepService } from './beer-dep.service';

describe('BeerDepService', () => {
  let service: BeerDepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeerDepService],
    }).compile();

    service = module.get<BeerDepService>(BeerDepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
