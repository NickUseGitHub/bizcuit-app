import { Test, TestingModule } from '@nestjs/testing';
import {
  MathBizService,
  invalidParameterError,
  parameterError,
} from './math-biz.service';

type ExpectResult = string;
type Tester = [string, string, ExpectResult];

const validTesters: Tester[] = [
  [1, 3],
  [5, 9],
  [23, 328],
  [29, 28],
  [58, 82],
].map(function mapToTesterType(arrTest) {
  const [numA, numB] = arrTest;

  return [String(numA), String(numB), String(numA + numB)];
});

const invalidTesters: Tester[] = [
  [1, 'asdfasdfa'],
  [5, undefined],
  [23, null],
  ['asdfadsfas', null],
  ['32', null],
].map(function mapToTesterType(arrTest) {
  const [numA, numB] = arrTest;

  return [numA, numB] as unknown as Tester;
});

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
    validTesters.forEach((tester) => {
      const [numA, numB, expectResult] = tester;

      expect(service.sum(numA, numB)).toBe(expectResult);
    });
  });

  it('should all be get correct result type string', () => {
    validTesters.forEach((tester) => {
      const [numA, numB] = tester;
      const expectType = 'string';

      expect(typeof service.sum(numA, numB)).toBe(expectType);
    });
  });

  it('should be throw an error when get wrong type parameters', () => {
    invalidTesters.forEach((tester) => {
      const [numA, numB] = tester;
      let error;

      try {
        service.sum(numA, numB);
      } catch (e) {
        error = e;
      }

      expect(
        error === parameterError || error === invalidParameterError,
      ).toBeTruthy();
    });
  });
});
