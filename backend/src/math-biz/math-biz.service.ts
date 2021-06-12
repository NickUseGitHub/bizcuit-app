import { Injectable } from '@nestjs/common';

@Injectable()
export class MathBizService {
  sum(numA: string, numB: string): string {
    if (Number.isNaN(numA) === true) {
      throw new Error(
        `typeof numA[${numA} -- ${typeof numA}] is not a number.`,
      );
    }

    if (Number.isNaN(numB) === true) {
      throw new Error(
        `typeof numB[${numB} -- ${typeof numB}] is not a number.`,
      );
    }

    return String(Number(numA) + Number(numB));
  }
}
