import connectionOptions from '../typeorm-connection';
import DatabaseConnection from './get-connection';
import { Seedable } from './types';
import { SeedBeer } from './seed-beer';

async function main() {
  const dbConnection = new DatabaseConnection(connectionOptions);
  await dbConnection.connect();

  const seedableDatum: Seedable[] = [
    new SeedBeer(dbConnection.getConnection()),
  ];

  for (const seedableData of seedableDatum) {
    await seedableData.seed();
  }

  await dbConnection.close();
}

main();
