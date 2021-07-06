import {MigrationInterface, QueryRunner, Table,} from "typeorm";

export class CreateAnxFiles1621113178924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"files",
                columns:[
                    {
                        name:"name_of_file",
                        type:"varchar",
                    
                    },
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"admin_id",
                        type:"uuid",
                        isNullable: true
                        
                    },
                    {
                        name:"user_id",
                        type:"uuid"
                    },
                    {
                        name:"size",
                        type:"number", 
                        isNullable: true
                        
                    },
                    {
                        name:"url",
                        type:"varchar",
                        isNullable: true
                        
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()" 
                    }

                ],

                foreignKeys:[
                    {
                        name: "FKUser2",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames:["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("files");
    }
}
