import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BeerService } from '~beer/beer.service';

@Injectable()
export class AuthBeerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly beerService: BeerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const { access_token } = request.cookies || {};
    if (!access_token) {
      return false;
    }

    const authBeer = await this.beerService.findById(Number(access_token));
    if (!authBeer) {
      return false;
    }

    request.authBeer = authBeer;
    return true;
  }
}
