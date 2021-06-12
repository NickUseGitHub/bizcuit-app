import { Test, TestingModule } from '@nestjs/testing';
import { MathBizService } from './math-biz.service';

type ExpectResult = string;
type Tester = [string, string, ExpectResult];

describe('MathBizService', () => {
  let service: MathBizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathBizService],
    }).compile();

    service = module.get<MathBizService>(MathBizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be get correct result', () => {
    const testers: Tester[] = [
      [1, 3],
      [5, 9],
      [23, 328],
      [29, 28],
      [58, 82],
    ].map(function mapToTesterType(arrTest) {
      const [numA, numB] = arrTest;

      return [String(numA), String(numB), String(numA + numB)];
    });

    testers.forEach((tester) => {
      const [numA, numB, expectResult] = tester;

      expect(service.sum(numA, numB)).toBe(expectResult);
    });
  });
});
