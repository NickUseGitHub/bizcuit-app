import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeerController } from './beer/beer.controller';
import { Beer } from './beer/beer.entity';
import { BeerService } from './beer/beer.service';
import { getBackendEnv } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getBackendEnv,
    }),
    TypeOrmModule.forFeature([Beer]),
  ],
  controllers: [AppController, BeerController],
  providers: [AppService, BeerService],
})
export class AppModule {}
