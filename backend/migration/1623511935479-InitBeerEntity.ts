import {MigrationInterface, QueryRunner} from "typeorm";

export class InitBeerEntity1623511935479 implements MigrationInterface {
    name = 'InitBeerEntity1623511935479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "beer" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying, "name" character varying, "style" character varying, "hop" character varying, "yeast" character varying, "malts" character varying, "ibu" character varying, "alcohol" character varying, "blg" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_28e2fa569fd012fab995a135a8f" PRIMARY KEY ("uid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "beer"`);
    }

}
