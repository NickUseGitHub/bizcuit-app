import { Injectable } from '@nestjs/common';

export const parameterError = new Error('typeof argument is not a number.');
export const invalidParameterError = new Error('Argument is invalid.');

@Injectable()
export class MathBizService {
  sum(numA: string, numB: string): string {
    if (!numA || !numB) {
      throw invalidParameterError;
    }

    if (isNaN(Number(numA)) === true || isNaN(Number(numB)) === true) {
      throw parameterError;
    }

    return String(Number(numA) + Number(numB));
  }
}
