import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import { ConfigFactory, ConfigService, registerAs } from '@nestjs/config';

export const getBackendEnv: ConfigFactory<ConnectionOptions> = (
  configService?: ConfigService,
) => {
  const migrationsDir = 'migration-vine';
  const entitiesPath = path.resolve(__dirname, '../vine/**/*.entity{.ts,.js}');
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
      host: configService.get('DB_HOST1'),
      port: +configService.get<number>('DB_PORT1'),
      username: configService.get('DB_USERNAME1'),
      password: configService.get('DB_PASSWORD1'),
      database: configService.get('DB_DATABASE1'),
      ...commonConfigs,
    };
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST1 || 'localhost',
    port: +process.env.DB_PORT1 || 5432,
    username: process.env.DB_USERNAME1,
    password: process.env.DB_PASSWORD1,
    database: process.env.DB_DATABASE1,
    ...commonConfigs,
  };
};

export default registerAs('database', getBackendEnv);
