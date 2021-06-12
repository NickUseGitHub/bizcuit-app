import { Controller, Get } from '@nestjs/common';

@Controller('beer')
export class BeerController {
  @Get()
  getBeer() {
    return 'This is beer';
  }
}
