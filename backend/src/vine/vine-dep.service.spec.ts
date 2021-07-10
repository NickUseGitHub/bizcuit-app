import { Test, TestingModule } from '@nestjs/testing';
import { VineDepService } from './vine-dep.service';

describe('VineDepService', () => {
  let service: VineDepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VineDepService],
    }).compile();

    service = module.get<VineDepService>(VineDepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
