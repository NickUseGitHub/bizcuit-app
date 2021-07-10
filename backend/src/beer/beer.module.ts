import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VinesModule } from '@vine/vines.module';
import { VineDepService } from '@vine/vine-dep.service';

import { BeerController } from '@beer/beer.controller';
import { Beer } from '@beer/beer.entity';
import { BeerService } from '@beer/beer.service';
import { BeerDepService } from '@beer/beer-dep.service';
import { getBackendEnv } from '@config/database-beer.config';

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
  providers: [VineDepService, BeerService, BeerDepService],
  exports: [],
})
export class BeerModule {}
