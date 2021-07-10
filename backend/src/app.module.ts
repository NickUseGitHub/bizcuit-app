import { Module } from '@nestjs/common';

import { BeerModule } from '~beer/beer.module';
import { VinesModule } from '~vine/vines.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, BeerModule, UserModule, VinesModule],
  providers: [],
})
export class AppModule {}
