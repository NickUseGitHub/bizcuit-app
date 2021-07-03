import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vine } from './vine.entity';

@Injectable()
export class VineService {
  constructor(
    @InjectRepository(Vine, 'vine')
    private readonly vinesRepository: Repository<Vine>,
  ) {}

  async testVineService(): Promise<boolean> {
    return true;
  }

  async getRandomVine() {
    return this.vinesRepository
      .createQueryBuilder()
      .select()
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
  }

  async increaseVineRandomCount(vine: Vine): Promise<void> {
    if (!vine) {
      return;
    }

    vine.randomCount = vine.randomCount + 1;
    await this.vinesRepository.save(vine);
  }
}
