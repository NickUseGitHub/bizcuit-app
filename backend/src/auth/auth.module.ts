import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '~auth/auth.controller';
import { AuthService } from '~auth/auth.service';
import { LocalStrategy } from '~auth/local.strategy';
import { UserModule } from '~user/user.module';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
