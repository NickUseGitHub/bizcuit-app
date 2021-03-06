import { Injectable } from '@nestjs/common';
import { UserService } from '~user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: unsendPasswordField, ...result } = user;

      return result;
    }
    return null;
  }

  async isLogin(accessToken: string): Promise<boolean> {
    return accessToken === 'accessToken';
  }
}
