import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedPhoneMobile1738912063955 implements MigrationInterface {
    name = 'RemovedPhoneMobile1738912063955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "mobile"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "mobile" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
