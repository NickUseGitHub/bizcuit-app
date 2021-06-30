import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeerController } from './beer/beer.controller';
import { Beer } from './beer/beer.entity';
import { BeerService } from './beer/beer.service';
import { getBackendEnv } from './config/database.config';
import { VinesModule } from './vine/vines.module';

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
    VinesModule,
  ],
  controllers: [BeerController],
  providers: [BeerService],
})
export class AppModule {}
