import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async login(@Request() req) {
    return req.user;
  }
}
