import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getBackendEnv } from '../config/database-vine.config';
import { VineController } from './vine/vine.controller';
import { Vine } from './vine/vine.entity';
import { VineService } from './vine/vine.service';
import { VineDepService } from './vine-dep.service';
import { BeerDepService } from 'src/beer/beer-dep.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
    }),
    TypeOrmModule.forRootAsync({
      name: 'vine',
      imports: [ConfigModule],
      useFactory: getBackendEnv,
    }),
    TypeOrmModule.forFeature([Vine], 'vine'),
  ],
  controllers: [VineController],
  providers: [BeerDepService, VineService, VineDepService],
  exports: [VineService, VineDepService],
})
export class VinesModule {}
