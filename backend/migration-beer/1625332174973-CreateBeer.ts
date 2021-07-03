import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBeer1625332174973 implements MigrationInterface {
  name = 'CreateBeer1625332174973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "beer" ("id" SERIAL NOT NULL, "uid" uuid NOT NULL, "brand" character varying, "name" character varying, "style" character varying, "hop" character varying, "yeast" character varying, "malts" character varying, "ibu" character varying, "alcohol" character varying, "blg" character varying, "randomCount" integer DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_28e2fa569fd012fab995a135a8f" UNIQUE ("uid"), CONSTRAINT "PK_68ce81153952014a6e8b20df5c1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "beer"`);
  }
}
