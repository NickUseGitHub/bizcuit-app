import beerConnectionOptions from '../typeorm-connection-beer';
import vinesConnectionOptions from '../typeorm-connection-vine';
import DatabaseConnection from './get-connection';
import { Seedable } from './types';
import { SeedBeer } from './seed-beer';
import { SeedVine } from './seed-vine';

async function seedBeers() {
  const dbConnection = new DatabaseConnection(beerConnectionOptions);
  await dbConnection.connect();

  const seedableDatum: Seedable[] = [
    new SeedBeer(dbConnection.getConnection()),
  ];

  for (const seedableData of seedableDatum) {
    await seedableData.seed();
  }

  await dbConnection.close();
}

async function seedVines() {
  const dbConnection = new DatabaseConnection(vinesConnectionOptions);
  await dbConnection.connect();

  const seedableDatum: Seedable[] = [
    new SeedVine(dbConnection.getConnection()),
  ];

  for (const seedableData of seedableDatum) {
    await seedableData.seed();
  }

  await dbConnection.close();
}

async function main() {
  await Promise.all([seedBeers(), seedVines()]);
}

main();
