import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VinesModule } from 'src/vine/vines.module';
import { BeerController } from './beer.controller';
import { Beer } from './beer.entity';
import { BeerService } from './beer.service';
import { getBackendEnv } from '../config/database-beer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
    }),
    TypeOrmModule.forRootAsync({
      name: 'beer',
      imports: [ConfigModule],
      useFactory: getBackendEnv,
    }),
    TypeOrmModule.forFeature([Beer], 'beer'),
    VinesModule,
  ],
  controllers: [BeerController],
  providers: [BeerService],
})
export class BeerModule {}
