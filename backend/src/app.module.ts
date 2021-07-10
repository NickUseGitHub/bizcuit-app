import { Module } from '@nestjs/common';

import { BeerModule } from '~beer/beer.module';
import { VinesModule } from '~vine/vines.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BeerModule, VinesModule, AuthModule],
  providers: [],
})
export class AppModule {}
