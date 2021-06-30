import { Module } from '@nestjs/common';
import { VineController } from './vine/vine.controller';
import { VineService } from './vine/vine.service';

@Module({
  controllers: [VineController],
  providers: [VineService],
  exports: [VineService],
})
export class VinesModule {}
