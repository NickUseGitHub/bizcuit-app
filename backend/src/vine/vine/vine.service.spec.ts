import { Test, TestingModule } from '@nestjs/testing';
import { VineService } from './vine.service';

describe('VineService', () => {
  let service: VineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VineService],
    }).compile();

    service = module.get<VineService>(VineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
