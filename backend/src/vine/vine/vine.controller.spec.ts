import { Test, TestingModule } from '@nestjs/testing';
import { VineController } from './vine.controller';

describe('VineController', () => {
  let controller: VineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VineController],
    }).compile();

    controller = module.get<VineController>(VineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
