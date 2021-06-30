import { Controller, Get } from '@nestjs/common';

@Controller('vine')
export class VineController {
  @Get()
  async vineIndex() {
    return 'Hello this is vine';
  }
}
