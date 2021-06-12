import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeerController } from './beer/beer.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
    }),
  ],
  controllers: [AppController, BeerController],
  providers: [AppService],
})
export class AppModule {}
