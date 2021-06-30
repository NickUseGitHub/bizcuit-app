import { Injectable } from '@nestjs/common';

@Injectable()
export class VineService {
  async testVineService(): Promise<boolean> {
    return true;
  }
}
