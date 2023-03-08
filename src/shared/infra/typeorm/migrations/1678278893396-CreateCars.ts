import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCars1678278893396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "daily_rate",
                        type: "numeric",
                    },
                    {
                        name: "available",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "license_plate",
                        type: "varchar",
                    },
                    {
                        name: "fine_amount",
                        type: "numeric",
                    },
                    {
                        name: "brand",
                        type: "varchar",
                    },
                    {
                        name: "category_id",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKCategoryCar", //nome desta referencia
                        referencedTableName: "categories", //tabela onde esta minha FK
                        referencedColumnNames: ["id"], //coluna onde esta minha FK na tabela de referencia
                        columnNames: ["category_id"], //qual coluna nesta tabela faz ref a fk
                        onDelete: "SET NULL", //o que acontece quando eu deleto o di na tabela pai
                        onUpdate: "SET NULL",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars");
    }

}
