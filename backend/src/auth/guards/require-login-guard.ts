import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from '~auth/auth.service';

@Injectable()
export class RequiredAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { access_token } = request.cookies || {};

    return this.authService.isLogin(String(access_token));
  }
}
