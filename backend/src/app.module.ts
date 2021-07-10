import { Module } from '@nestjs/common';

import { AuthModule } from '~auth/auth.module';
import { BeerModule } from '~beer/beer.module';
import { UserModule } from '~user/user.module';
import { VinesModule } from '~vine/vines.module';

@Module({
  imports: [AuthModule, BeerModule, UserModule, VinesModule],
  providers: [],
})
export class AppModule {}
