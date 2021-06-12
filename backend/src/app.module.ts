import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeerController } from './beer/beer.controller';

@Module({
  imports: [],
  controllers: [AppController, BeerController],
  providers: [AppService],
})
export class AppModule {}
