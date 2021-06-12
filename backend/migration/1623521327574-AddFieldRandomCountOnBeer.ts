import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldRandomCountOnBeer1623521327574
  implements MigrationInterface
{
  name = 'AddFieldRandomCountOnBeer1623521327574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "beer" ADD "randomCount" integer DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "beer" DROP COLUMN "randomCount"`);
  }
}
