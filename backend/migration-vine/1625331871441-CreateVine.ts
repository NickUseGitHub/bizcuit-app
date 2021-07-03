import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVine1625331871441 implements MigrationInterface {
  name = 'CreateVine1625331871441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vine" ("id" SERIAL NOT NULL, "uid" uuid NOT NULL, "brand" character varying, "name" character varying, "style" character varying, "hop" character varying, "yeast" character varying, "malts" character varying, "ibu" character varying, "alcohol" character varying, "blg" character varying, "randomCount" integer DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_19cba89430e6db216da499b5909" UNIQUE ("uid"), CONSTRAINT "PK_6fd314f6311b6dfb1ece2ab72a1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "vine"`);
  }
}
