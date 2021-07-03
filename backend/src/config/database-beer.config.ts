import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import { ConfigFactory, ConfigService, registerAs } from '@nestjs/config';

export const getBackendEnv: ConfigFactory<ConnectionOptions> = (
  configService?: ConfigService,
) => {
  const migrationsDir = 'migration-beer';
  const entitiesPath = path.resolve(__dirname, '../beer/**/*.entity{.ts,.js}');
  const migrationPath = path.resolve(
    __dirname,
    `../../${migrationsDir}/*{.ts,.js}`,
  );

  const commonConfigs = {
    entities: [entitiesPath],
    migrations: [migrationPath],
    cli: {
      migrationsDir,
    },
  };

  if (configService) {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      ...commonConfigs,
    };
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ...commonConfigs,
  };
};

export default registerAs('database', getBackendEnv);
