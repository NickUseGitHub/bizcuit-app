import { Module } from '@nestjs/common';

import { BeerModule } from './beer/beer.module';
import { VinesModule } from './vine/vines.module';

@Module({
  imports: [BeerModule, VinesModule],
})
export class AppModule {}
