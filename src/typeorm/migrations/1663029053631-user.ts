import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class user1663029053631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar'
            },
            {
              name: 'phone',
              type: 'varchar'
            },
            {
              name: 'email',
              type: 'varchar'
            },
            {
              name: 'password',
              type: 'varchar'
            },
            {
              name: 'bornDate',
              type: 'timestamp',
              isNullable: true
            },
            {
              name: 'gender',
              type: 'enum',
              enum: ['M', 'F', 'ND'],
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              isNullable: true,
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              isNullable: true,
              default: 'now()',
            },
            {
              name: 'deletedAt',
              type: 'timestamp',
              isNullable: true,
            },
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
